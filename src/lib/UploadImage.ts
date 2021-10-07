import { ref, uploadBytes } from "firebase/storage";
import { ImageStateType } from "../../pages/broadcast";
import { storage } from "./firebase";
import imageCompression from "browser-image-compression";

export const UploadImage = async (
  //画像をアップロード
  bucket: string,
  imageState: ImageStateType | null | undefined,
  filename: string,
  maxSizeMB: number,
  maxWidthOrHeight: number,
  initialQuality: number
) => {
  if (imageState) {
    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      initialQuality,
    };
    //imageStateがnullなら何もしない

    const compressedFile = await imageCompression(imageState.file, options);
    await uploadBytes(ref(storage, `${bucket}/${filename}`), compressedFile, {
      cacheControl: "public,max-age=600",
      contentType: imageState.file.type,
    });
  }
};
