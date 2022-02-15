import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "patricktuy",
  api_key: "545381743956139",
  api_secret: "eipt2ThpVtHLi-RVlMjRV_uSQu0",
});

export const uploadFile = async (req) => {
  let imageUrl = "";
  await cloudinary.v2.uploader.upload(
    req.file.path,
    async function (err, image) {
      if (err) {
        console.warn(err);
      }
      imageUrl = image.url;
    }
  );
  return imageUrl;
};
