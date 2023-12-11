import React, { forwardRef } from "react";

function DetailImageComponent(props, ref) {
  return (
    <section
      ref={ref}
      className="flex h-[600px] w-[1280px] items-center justify-center border"
    >
      <h3>상품 상세설명 이미지</h3>
    </section>
  );
}

const DetailImage = forwardRef<HTMLDivElement>(DetailImageComponent);

DetailImage.displayName = "상품 상세설명 이미지";

export default DetailImage;
