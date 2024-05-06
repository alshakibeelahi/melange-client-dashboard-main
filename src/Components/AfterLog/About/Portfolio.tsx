import { AllImages } from "@/assets/AllImages";
import { Col, Divider, Empty, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import baseAxios from "../../../../Config";
import { getImageUrl } from "@/app/utils";

type FieldType = {
  image?: string;
};

const Portfolio = ({
  data,
}: {
  data: {
    type: any;
    id: string;
  };
}) => {
  const [portfolio, setPortfolio] = useState<FieldType[]>([]);
  useEffect(() => {
    baseAxios
      .get(`contents?type=portfolio&userId=${data.id}`)
      .then((res) => {
        setPortfolio(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var spans: any = [10, 8, 16, 10, 9, 8]; // Default spans

  if (data && data.type.includes("music-artist")) {
    spans = [6, 14, 12, 8, 10, 9, 11, 13]; // Modified spans for zigzag pattern
  }
  if (data && data.type.includes("visual-artist")) {
    spans = [9, 6, 14, 6, 7, 11, 9, 6]; // Modified spans for zigzag pattern
  }
  if (data && data.type.includes("digital-artist")) {
    spans = [8, 10, 10, 8, 12, 6, 8, 8]; // Modified spans for zigzag pattern
  }

  const imageBaseURL = getImageUrl();
  console.log('hello------------.',imageBaseURL, typeof imageBaseURL)

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className="">
      <div className="lg:w-[80%] mx-auto">
        <h1 className="-mb-5 text-2xl text-site-color font-bold">Portfolio</h1>
      </div>

      {portfolio && portfolio.length > 0 ? (
        <>
          {
            <section className="py-6 dark:text-gray-900">
              <div className="container p-4 mx-auto flex justify-end">
                <Row gutter={[16, 16]} justify="space-around">
                  {portfolio.map((item, index) => (
                    <Col
                      key={index}
                      xs={24}
                      md={spans[index % 6]} // Use modulus to cycle through span values
                      lg={spans[index % 6]} // Use modulus to cycle through span values
                      style={{
                        marginTop: `${getRandomNumber(10, 250)}px`,
                      }}
                    >
                      <img
                        src={imageBaseURL + item.image}
                        alt=""
                        className="w-full h-full shadow-sm min-h-52 aspect-square"
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </section>
          }
        </>
      ) : (
        <div>
          <Empty description="No portfolio uploaded yet" />
        </div>
      )}
    </div>
  );
};

export default Portfolio;
