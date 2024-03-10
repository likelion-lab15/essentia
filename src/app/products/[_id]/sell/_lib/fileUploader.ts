import { fetchData } from "@/fetch/fetch";

export const uploadFiles = async (files: FileList | null) => {
  const formData = new FormData();
  if (files) {
    Array.from(files).forEach((file) => formData.append("attach", file)); // 파일들을 FormData에 추가
  }

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const responseData = await fetchData("files", options);
    if (responseData && responseData.files) {
      return responseData.files.map((file: any) => `${file.path}`);
    }
    return [];
  } catch (error) {
    console.error("파일 업로드 오류", error);
    return [];
  }
};
