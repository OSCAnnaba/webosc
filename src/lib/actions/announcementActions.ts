"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";
import { ActionError, TokenPayload } from "@/lib/types";

export async function createAnnouncement(
  state: { success: boolean | null; message: string; redirect: string | null },
  formData: FormData,
) {
  const createAnnouncementFormSchema = z.object({
    org_id: z.string().min(4, { message: "Organization ID is required!" }),
    title: z.string().min(1, { message: "Title is required!" }).max(40, {
      message: "Title must be less than 40 characters!",
    }),
    body: z.string().min(1, { message: "Body is required!" }),
    publishes_at: z.date({ message: "publishing date is required" }),
    ends_at: z.date({ message: "publishing ending date is required" }),
  });
  try {
    const createAnnouncementFormData = {
      org_id: formData.get("org_id") as string,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      publishes_at: (formData.get("publishes_at") as string)
        ? new Date(formData.get("publishes_at") as string)
        : null,
      ends_at: (formData.get("ends_at") as string)
        ? new Date(formData.get("ends_at") as string)
        : null,
    };

    // authenticate user
    const user = authenticateUser();

    // check if org exists
    const checkOrg = await prisma.organization.findFirst({
      where: {
        org_id: createAnnouncementFormData.org_id,
      },
    });

    if (!checkOrg) throw new ActionError("Organization Not Found!");

    // authorize user
    const checkEditorPrivilages = await prisma.editor.findFirst({
      where: {
        user_id: user.user_id,
        org_id: createAnnouncementFormData.org_id,
      },
    });

    if (!checkEditorPrivilages)
      throw new ActionError("You are not an Editor in this organization!");

    if (checkEditorPrivilages.status !== "active")
      throw new ActionError(
        "You are no longer an Editor in this organization!",
      );

    // validate form
    const parsedCreateAnnouncementFormData =
      createAnnouncementFormSchema.safeParse(createAnnouncementFormData);

    if (!parsedCreateAnnouncementFormData.success) {
      throw new ActionError(
        parsedCreateAnnouncementFormData.error.issues[0].message,
      );
    }

    // make sure publish date is in the future
    if (new Date() > parsedCreateAnnouncementFormData.data.publishes_at)
      throw new ActionError("publish date cannot be in the past");

    // make sure ends date is not before publish date
    if (
      parsedCreateAnnouncementFormData.data.publishes_at >
      parsedCreateAnnouncementFormData.data.ends_at
    )
      throw new ActionError(
        "ends publishing date must be after publishing date",
      );

    // create the announcement
    const announcement = await prisma.announcement.create({
      data: {
        title: parsedCreateAnnouncementFormData.data.title,
        body: parsedCreateAnnouncementFormData.data.body,
        editor_id: checkEditorPrivilages.editor_id,
        org_id: parsedCreateAnnouncementFormData.data.org_id,
        publishes_at: parsedCreateAnnouncementFormData.data.publishes_at,
        ends_at: parsedCreateAnnouncementFormData.data.ends_at,
      },
    });

    state = {
      success: true,
      redirect: `/announcement/${announcement.announcement_id}`,
      message: "The announcement was created successfully!",
    };
  } catch (error: any) {
    state.success = false;
    if (error instanceof ActionError) state.message = error.message;
    else state.message = "Something went wrong. Please try again later!";
  }
  return state;
}

const secret = process.env.JWT_SECRET;

function authenticateUser() {
  const token = cookies().get("token")?.value;

  if (!token) throw new ActionError("You are not Logged In!");

  if (!secret) throw new ActionError("Internal error. Please try again later!");

  let user;
  try {
    user = verify(token, secret) as TokenPayload;
  } catch (error) {
    cookies().delete("token");
    console.log("Unverified token");
    throw new ActionError("Token invalid or expired. Please log in again!");
  }

  return user;
}
