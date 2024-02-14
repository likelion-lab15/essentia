/* 파일 업로드 처리 함수 */
export const uploadFiles = async (files: any) => {
  const formData = new FormData();
  files.forEach((file: any) => formData.append("attach", file)); // 파일들을 FormData에 추가

  try {
    // 파일을 서버로 전송하고, 업로드된 파일의 경로를 반환 받음
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/files`,
      {
        method: "POST",
        body: formData,
      }
    );

    const responseData = await response.json();
    return responseData.files.map((file: any) => `${file.path}`); // 서버 응답에서 파일 경로를 추출하고, 배열로 반환
  } catch (error) {
    console.error("파일 업로드 오류", error);
    return [];
  }
};
