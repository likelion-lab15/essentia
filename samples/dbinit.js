import logger from "../utils/logger.js";
import dotenv from "dotenv";

// 기본 .env 파일 로딩(package.json에서 로딩함)
// dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
logger.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

import db, { getClient, nextSeq } from "../utils/dbutil.js";
import moment from "moment";

async function main() {
  await db.dropDatabase();
  logger.info("DB 삭제.");
  await initDB();
  return "DB 초기화 완료.";
}

main()
  .then(logger.info)
  .catch(logger.error)
  .finally(() => getClient().close());

async function initDB() {
  // 시퀀스 등록
  await registSeq();
  console.info("1. 시퀀스 등록 완료.");

  // 회원 등록
  await registUser();
  console.info("2. 회원 등록 완료.");

  // 상품 등록
  await registProduct();
  console.info("3. 상품 등록 완료.");

  // // 장바구니 등록
  await registCart();
  console.info("4. 장바구니 등록 완료.");

  // // 구매 등록
  await registOrder();
  console.info("5. 구매 등록 완료.");

  // // 후기 등록
  await registReply();
  console.info("6. 후기 등록 완료.");

  // // 코드 등록
  await registCode();
  console.info("7. 코드 등록 완료.");

  // 상품 조회
  await productList();
}

function getDay(day = 0) {
  return moment().add(day, "days").format("YYYY.MM.DD");
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

// 시퀀스 등록
async function registSeq() {
  const seqList = ["user", "product", "cart", "order", "reply"];
  const data = seqList.map((_id) => ({ _id, no: 1 }));
  await db.seq.insertMany(data);
}

// 회원 등록
async function registUser() {
  var data = [
    {
      _id: await nextSeq("user"),
      email: "admin@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "무지",
      phone: "01011112222",
      address: "서울시 강남구 역삼동 123",
      type: "admin",
      createdAt: getTime(-100, -60 * 60 * 3),
      updatedAt: getTime(-100, -60 * 60 * 3),
      extra: {
        birthday: "03-23",
        level: "UL03",
        addressBook: [
          {
            id: 1,
            name: "집",
            value: "서울시 강남구 역삼동 123",
          },
          {
            id: 2,
            name: "회사",
            value: "서울시 강남구 신사동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "s1@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "네오",
      phone: "01022223333",
      address: "서울시 강남구 삼성동 456",
      type: "seller",
      createdAt: getTime(-50),
      updatedAt: getTime(-30, -60 * 60 * 3),
      extra: {
        birthday: "11-23",
        level: "UL01",
        addressBook: [
          {
            id: 1,
            name: "회사",
            value: "서울시 강남구 삼성동 567",
          },
          {
            id: 2,
            name: "학교",
            value: "서울시 강남구 역삼동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "s2@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "어피치",
      phone: "01033334444",
      address: "서울시 강남구 도곡동 789",
      type: "seller",
      createdAt: getTime(-40, -60 * 30),
      updatedAt: getTime(-30, -60 * 20),
      extra: {
        birthday: "11-24",
        level: "UL02",
        addressBook: [
          {
            id: 1,
            name: "회사",
            value: "서울시 마포구 연희동 123",
          },
          {
            id: 2,
            name: "가게",
            value: "서울시 강남구 학동 234",
          },
        ],
      },
    },
    {
      _id: await nextSeq("user"),
      email: "u1@market.com",
      password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
      name: "제이지",
      phone: "01044445555",
      address: "서울시 강남구 논현동 222",
      type: "user",
      createdAt: getTime(-20, -60 * 30),
      updatedAt: getTime(-10, -60 * 60 * 12),
      extra: {
        birthday: "11-30",
        level: "UL01",
        address: [
          {
            id: 1,
            name: "회사",
            value: "서울시 강동구 천호동 123",
          },
          {
            id: 2,
            name: "집",
            value: "서울시 강동구 성내동 234",
          },
        ],
      },
    },
  ];

  await db.user.insertMany(data);
}

// 상품 등록
async function registProduct() {
  var data = [
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 260000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "ANOTHER 13",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/another13.png`,
      ],
      content: `
        <div class="product-detail">
          <p>ANOTHER 13</p>
        </div>`,
      createdAt: getTime(-38, -60 * 60 * 6),
      updatedAt: getTime(-33, -60 * 55),
      extra: {
        isNew: false,
        isBest: true,
        category: ["PC01", "PC0103"],
        sort: 4,
        amount: 50,
        brand: "LE LABO",
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 310000,
      shippingFees: 0,
      show: true,
      active: true,
      name: "ROSE 31",
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/santal33.png`,
      ],
      content: `
        <div class="product-detail">
          <p>ROSE 31</p>
        </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
      extra: {
        isNew: true,
        isBest: true,
        category: ["PC03", "PC0301"],
        sort: 5,
        amount: 50,
        brand: "LE LABO",
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 169000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "LYS 41",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/santal33.png`,
      ],
      content: `
        <div class="product-detail">
          <p>LYS 41</p>
        </div>`,
      createdAt: getTime(-38, -60 * 60 * 6),
      updatedAt: getTime(-33, -60 * 55),
      extra: {
        isNew: false,
        isBest: true,
        category: ["PC01", "PC0103"],
        sort: 4,
        amount: 100,
        brand: "LE LABO",
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 350000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "BERGAMOTE 22",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/santal33.png`,
      ],
      content: `
        <div class="product-detail">
          <p>BERGAMOTE 22</p>
        </div>`,
      createdAt: getTime(-38, -60 * 60 * 6),
      updatedAt: getTime(-33, -60 * 55),
      extra: {
        isNew: false,
        isBest: true,
        category: ["PC01", "PC0103"],
        sort: 4,
        amount: 100,
        brand: "LE LABO",
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 250000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "THE MATCHA 26",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/santal33.png`,
      ],
      content: `
        <div class="product-detail">
          <p>THE MATCHA 26</p>
        </div>`,
      createdAt: getTime(-38, -60 * 60 * 6),
      updatedAt: getTime(-33, -60 * 55),
      extra: {
        isNew: false,
        isBest: true,
        category: ["PC01", "PC0103"],
        sort: 4,
        amount: 100,
        brand: "LE LABO",
      },
    },
    {
      _id: await nextSeq("product"),
      seller_id: 2,
      price: 167000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "VETIVER 46",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploadsjisu/santal33.png`,
      ],
      content: `
        <div class="product-detail">
          <p>VETIVER 46</p>
        </div>`,
      createdAt: getTime(-38, -60 * 60 * 6),
      updatedAt: getTime(-33, -60 * 55),
      extra: {
        isNew: false,
        isBest: true,
        category: ["PC01", "PC0103"],
        sort: 4,
        amount: 100,
        brand: "LE LABO",
      },
    },
  ];

  await db.product.insertMany(data);
}

// 장바구니 등록
async function registCart() {
  var data = [
    {
      _id: await nextSeq("cart"),
      user_id: 4,
      product_id: 1,
      count: 2,
      createdAt: getTime(-7, -60 * 30),
      updatedAt: getTime(-7, -60 * 30),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 4,
      product_id: 2,
      count: 1,
      createdAt: getTime(-4, -60 * 30),
      updatedAt: getTime(-3, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 2,
      product_id: 3,
      count: 2,
      createdAt: getTime(-3, -60 * 60 * 4),
      updatedAt: getTime(-3, -60 * 60 * 4),
    },
    {
      _id: await nextSeq("cart"),
      user_id: 2,
      product_id: 4,
      count: 3,
      createdAt: getTime(-2, -60 * 60 * 12),
      updatedAt: getTime(-1, -60 * 60 * 20),
    },
  ];

  await db.cart.insertMany(data);
}

// 구매 등록
async function registOrder() {
  var data = [
    {
      _id: await nextSeq("order"),
      user_id: 4,
      state: "OS010",
      products: [
        {
          _id: 2,
          name: "헬로카봇 스톰다이버",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-diver.jpg`,
          quantity: 2,
          price: 34520,
          reply_id: 3,
        },
      ],
      cost: {
        products: 34520,
        shippingFees: 2500,
        total: 37020,
      },
      address: {
        name: "회사",
        value: "서울시 강남구 신사동 234",
      },
      createdAt: getTime(-6, -60 * 60 * 3),
      updatedAt: getTime(-6, -60 * 60 * 3),
    },
    {
      _id: await nextSeq("order"),
      user_id: 2,
      state: "OS040",
      products: [
        {
          _id: 3,
          name: "레고 클래식 라지 조립 박스 10698",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-classic.jpg`,
          quantity: 1,
          price: 48870,
        },
        {
          _id: 4,
          name: "레고 테크닉 42151 부가티 볼리드",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-bugatti.png`,
          quantity: 2,
          price: 90000,
          reply_id: 2,
        },
      ],
      cost: {
        products: 138840,
        shippingFees: 3500,
        total: 142370,
      },
      address: {
        name: "집",
        value: "서울시 강남구 역삼동 123",
      },
      createdAt: getTime(-4, -60 * 60 * 22),
      updatedAt: getTime(-2, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("order"),
      user_id: 4,
      state: "OS310",
      products: [
        {
          _id: 4,
          name: "레고 테크닉 42151 부가티 볼리드",
          image: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/sample-bugatti.png`,
          quantity: 1,
          price: 45000,
          reply_id: 1,
        },
      ],
      cost: {
        products: 45000,
        shippingFees: 3500,
        total: 48500,
      },
      address: {
        name: "학교",
        value: "서울시 강남구 역삼동 234",
      },
      createdAt: getTime(-3, -60 * 60 * 18),
      updatedAt: getTime(-1, -60 * 60 * 1),
    },
  ];

  await db.order.insertMany(data);
}

// 후기 등록
async function registReply() {
  var data = [
    {
      _id: await nextSeq("reply"),
      user_id: 4,
      product_id: 4,
      rating: 5,
      content: "아이가 좋아해요.",
      createdAt: getTime(-4, -60 * 60 * 12),
    },
    {
      _id: await nextSeq("reply"),
      user_id: 2,
      product_id: 4,
      rating: 4,
      content: "배송이 좀 느려요.",
      createdAt: getTime(-3, -60 * 60 * 1),
    },
    {
      _id: await nextSeq("reply"),
      user_id: 4,
      product_id: 2,
      rating: 1,
      content: "하루만에 고장났어요.",
      createdAt: getTime(-2, -60 * 60 * 10),
    },
  ];

  await db.reply.insertMany(data);
}

// 코드 등록
async function registCode() {
  var data = [
    {
      _id: "productCategory",
      title: "상품 카테고리",
      codes: [
        {
          sort: 2,
          code: "PC01",
          value: "어린이",
          depth: 1,
        },
        {
          sort: 3,
          code: "PC0101",
          value: "퍼즐",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 1,
          code: "PC0102",
          value: "보드게임",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0103",
          value: "레고",
          parent: "PC01",
          depth: 2,
        },
        {
          sort: 4,
          code: "PC0104",
          value: "로봇",
          parent: "PC01",
          depth: 2,
        },

        {
          sort: 1,
          code: "PC02",
          value: "스포츠",
          depth: 1,
        },
        {
          sort: 1,
          code: "PC0201",
          value: "축구",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0202",
          value: "야구",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0203",
          value: "농구",
          parent: "PC02",
          depth: 2,
        },

        {
          sort: 3,
          code: "PC03",
          value: "어른",
          parent: "PC03",
          depth: 1,
        },
        {
          sort: 1,
          code: "PC0301",
          value: "원격 조종",
          parent: "PC03",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0302",
          value: "퍼즐",
          parent: "PC03",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0303",
          value: "레고",
          parent: "PC03",
          depth: 2,
        },
      ],
    },
    {
      _id: "orderState",
      title: "주문 상태",
      codes: [
        {
          sort: 1,
          code: "OS010",
          value: "주문 완료",
        },
        {
          sort: 2,
          code: "OS020",
          value: "결제 완료",
        },
        {
          sort: 3,
          code: "OS030",
          value: "배송 준비중",
        },
        {
          sort: 4,
          code: "OS040",
          value: "배송 완료",
        },
        {
          sort: 5,
          code: "OS110",
          value: "반품 요청",
        },
        {
          sort: 6,
          code: "OS120",
          value: "반품 처리중",
        },
        {
          sort: 7,
          code: "OS130",
          value: "반품 완료",
        },
        {
          sort: 8,
          code: "OS210",
          value: "교환 요청",
        },
        {
          sort: 9,
          code: "OS220",
          value: "교환 처리중",
        },
        {
          sort: 10,
          code: "OS230",
          value: "교환 완료",
        },
        {
          sort: 11,
          code: "OS310",
          value: "환불 요청",
        },
        {
          sort: 12,
          code: "OS320",
          value: "환불 처리중",
        },
        {
          sort: 13,
          code: "OS330",
          value: "환불 완료",
        },
      ],
    },
  ];
  await db.code.insertMany(data);
}

// 모든 상품명을 출력한다.
async function productList() {
  var result = await db.product
    .find({}, { projection: { _id: 0, name: 1 } })
    .toArray();
  logger.log(`상품 ${result.length}건 조회됨.`);
  logger.log(result);
}
