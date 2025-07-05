import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "orejitas";
  const transformation = "f_auto,q_auto,w_800";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
      transformation
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    transformation
  });
}