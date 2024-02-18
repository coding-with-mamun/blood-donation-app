import cloudinary from "cloudinary";

// configuration
cloudinary.v2.config({
  cloud_name: "djavwc4ai",
  api_key: "552975571449434",
  api_secret: "3dXmbGFdpSYsRyhZaa6LQ5WhwcM",
});

// file upload to cloud
export const fileUploadToCloud = async (path) => {
  const data = await cloudinary.v2.uploader.upload(path);
  return data;
};

// file delete form cloud
export const fileDeleteToCloud = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};
