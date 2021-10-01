import { ref, uploadBytes } from "firebase/storage";
import { ImageStateType } from "../../pages/broadcast";
import { storage } from "./firebase";

export const UploadImage = async (
  //画像をアップロード
  bucket: string,
  imageState: ImageStateType | null | undefined,
  filename: string
) => {
  if (
    imageState &&
    imageState.binaryStr &&
    typeof imageState.binaryStr !== "string"
  ) {
    //imageStateがnullなら何もしない
    await uploadBytes(
      ref(storage, `${bucket}/${filename}`),
      imageState.binaryStr,
      {
        cacheControl: "public,max-age=600",
        contentType: imageState.file.type,
      }
    );
  }
};
