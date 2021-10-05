import * as Yup from "yup";

export const broadcastSchema = Yup.object({
  title: Yup.string()
    .max(20, "タイトルが長すぎます")
    .required("タイトルを入力してください"),
  content: Yup.string()
    .min(2, "説明文が短すぎます")
    .max(255, "説明文が長すぎます")
    .required("説明文を入力してください"),
});

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("正しいメールアドレスを入力してください")
    .required("メールアドレスを入力してください"),
  password: Yup.string()
    .min(6, "パスワードが短すぎます")
    .max(30, "パスワードが長すぎます")
    .required("パスワードを入力してください"),
});

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(2, "名前が短すぎます")
    .max(10, "名前が長すぎます")
    .required("名前を入力してください"),
  email: Yup.string()
    .email("正しいメールアドレスを入力してください")
    .required("メールアドレスを入力してください"),
  password: Yup.string()
    .min(6, "パスワードが短すぎます")
    .max(30, "パスワードが長すぎます")
    .required("パスワードを入力してください"),
  passwordconfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "パスワードが一致しません")
    .required("パスワードを入力してください"),
});
