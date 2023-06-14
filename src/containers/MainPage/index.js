import { Layout, Row, Col, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { memo, useCallback, useEffect, useState } from "react";

import "./styles.scss";
import HotNews from "./HotNews";
import useAPI from "../../hooks/useAPI";

const { Content } = Layout;
const { Option } = Select;

function MainPage({ BE_API_DEFAULT_ROUTE }) {
  const [curPorvince, setCurProvice] = useState(null);
  const [curDistrict, setCurDistrict] = useState(null);
  const [curWard, setCurWard] = useState(null);

  const [
    { isLoading: isLoadingProvincesData, data: provinces = [] },
    onGetProvinceList,
  ] = useAPI({
    url: "/provinces",
  });
  const [
    { isLoading: isLoadingDistrictsData, data: districts = [] },
    onGetDistrictList,
  ] = useAPI({
    url: "/districts",
  });

  useEffect(() => {
    onGetProvinceList();
    onGetDistrictList();
  }, []);

  const wards = [];

  const [searchValue, setSearchValue] = useState({
    province: null,
    district: null,
    ward: null,
  });

  const handleSetProvince = useCallback(
    (province) => {
      setCurProvice(provinces?.find((p) => p.provinceId === province));
      setCurDistrict(null);
      setCurWard(null);
    },
    [provinces]
  );

  const handleSetDistrict = useCallback(
    (district) => {
      setCurDistrict(districts?.find((p) => p.districtId === district));
      setCurWard(null);
    },
    [districts]
  );

  //   const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc/top`);
  const { isLoading, data } = {
    isLoading: true,
    data: [
      {
        id: "1",
        tenduan: "tenduan",
        dientich: "dientich",
        vitri: "vitri",
        created_date: "created_date",
      },
      { id: "2", tenduan: "tenduan", dientich: "dientich" },
    ],
  };
  return (
    <Content>
      <div className="home-banner">
        <Row gutter={24} className="search-banner">
          <Col>
            <div className="container">
              <div className="title">Tỉnh / Thành Phố</div>
              <Select
                placeholder="Chọn Tỉnh / Thành Phố"
                onChange={handleSetProvince}
                loading={isLoadingProvincesData}
                disabled={isLoadingProvincesData}
              >
                {provinces.map((province) => (
                  <Option key={province.provinceId} value={province.provinceId}>
                    {province.province}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div className="container">
              <div className="title">Quận Huyện</div>
              <Select
                placeholder="Chọn Quận Huyện"
                onChange={handleSetDistrict}
                disabled={curPorvince === null || isLoadingDistrictsData}
              >
                {districts.map((district) => (
                  <Option key={district.districtId} value={district.districtId}>
                    {district.district}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div className="container">
              <div className="title">Phường - Xã</div>
              <Select
                placeholder="Chọn Phường - Xã"
                value={curWard}
                onChange={setCurWard}
                disabled={curDistrict === null}
              >
                {wards.map((ward) => (
                  <Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <Button
                href={`search?province=${curPorvince}&district=${curDistrict}&ward=${curWard}}`}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <HotNews autoplay />

      <div className="dailynews-banner">
        <div className="dailynews-banner__top">
          <h2 className="title">Bất động sản dành cho bạn</h2>
        </div>
        <Row gutter={[16, 24]} className="dailynews-banner__body">
          {!data ? (
            <div style={{ fontSize: "25px", fontWeight: 600 }}>
              Hiện không có tin tức
            </div>
          ) : (
            data?.map((tintuc) => {
              const ViewDetailsUrl = `/view-details/${tintuc.id}`;
              return (
                <Col className="home-product" span={6} key={tintuc.id}>
                  <div className="product-thumb ">
                    <a href={ViewDetailsUrl}>
                      <img
                        className=" ls-is-cached lazyloaded"
                        alt="first-img"
                        src={`${BE_API_DEFAULT_ROUTE}/file/download/${
                          tintuc?.images?.split(",")?.[0]
                        }`}
                      />
                    </a>
                  </div>
                  <div className="home-product-bound">
                    <a href={ViewDetailsUrl} className="product-title">
                      {tintuc.tenduan}
                    </a>
                    <div className="product-price">{tintuc.dientich}</div>
                    <a href="/" className="product-address">
                      {tintuc.vitri}
                    </a>
                    <div className="product-date">{tintuc.created_date}</div>
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </Content>
  );
}

export default memo(MainPage);
