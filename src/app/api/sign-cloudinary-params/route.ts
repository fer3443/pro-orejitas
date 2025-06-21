import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "orejitas";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    timestamp,
    folder,
    signature,
  });
}
// import { NextResponse } from "next/server";
// import crypto from "crypto";

// // Este endpoint genera la firma segura para subir archivos a Cloudinary
// export async function GET() {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const folder = "orejitas"; // o lo que uses
//   const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

//   const signature = crypto
//     .createHmac("sha1", process.env.CLOUDINARY_API_SECRET as string)
//     .update(paramsToSign)
//     .digest("hex");

//   return NextResponse.json({
//     signature,
//     timestamp,
//     folder,
//   });
// }