import {use, useState, useReducer, createContext, useRef, useEffect, useContext} from "react";
import CheckboxButton from "../../components/partials/CheckboxButton";
import {v4 as uuidv4} from "uuid";
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import {Formik, Form as FMForm, Field, useFormikContext, FieldArray, ErrorMessage} from "formik";
import * as Yup from "yup";
import GardenMakeLayout from "../../components/partials/GardenMakeLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Collapse from "react-bootstrap/Collapse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageLoader from "../../components/ImageLoader";
import {Card, CardImg, Container} from "react-bootstrap";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import {Button, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import {LoginContext} from "../_app";
import apiClient from "../../services/apiClient";

const gardenMakeOne = () => {
  const {loginInfo} = useContext(LoginContext);

  // form 유효성 체크
  const gardenSchema = Yup.object().shape({
    title: Yup.string().min(3, "정원 이름은 3글자 이상이어야 합니다").max(30, "30글자 이하로 입력하세요").required("필수 항목입니다."),
    capacity: Yup.number("숫자만 입력하세요").positive("양수로 입력하세요.").required("필수 항목입니다.").max(100, "최대 인원은 100명입니다."),
    description: Yup.string().required("필수 항목입니다.").max(500, "500글자 이하로 입력해주세요."),
    categories: Yup.array().min(1, "하나는 필수로 선택하셔야 합니다.").required(),
    regularTime: Yup.string().required(),
  });

  const defaultImg = "/images/cover/SF1.jpg";
  const [imgPath, setImgPath] = useState("/defaultCover/SF.jpg");

  {
    /* Register Filepond plugins */
  }
  registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform);
  const router = useRouter();

  const handleUpload = async () => {
    const formData = new FormData();
    const uniqueIdentifier = uuidv4();
    const file = coverImg[0].file;
    const fileName = uniqueIdentifier + "." + file.name.split(".").pop();
    formData.append("coverImg", file, fileName);

    try {
      // Axios로 POST 요청을 보냅니다.
      const response = await axios.post("http://localhost:80/garden/uploadImg", formData, {withCredentials: true});

      if (response.status === 200) {
        // 성공적으로 업로드된 경우 처리 로직
        return "/garden/" + fileName; // Return the new imgPath
        alert("imgPath handleUpload:" + imgPath);
      } else {
        // 업로드 실패 처리 로직
        alert("이미지 업로드에 실패했습니다. 다시 확인해주세요.");
      }
    } catch (error) {
      // Axios 오류 처리
      console.error("axios 이미지 업로드 오류!!!!!!!!!!!!:" + error);
    }
  };

  //제출 로직
  const handleSubmit = async (values, e) => {
    if (!accessType || !flower) {
      alert("필수 정보가 입력되지 않았습니다. 다시 확인해주세요.");
      if (!accessType) setAccessCheck(true);
      if (!flower) setFlowerCheck(true);
      return;
    }

    const newImgPath = await handleUpload();

    try {
      const updatedValues = {
        garden: {
          ...values,
          imgPath: newImgPath,
          flower: flower,
          accessType: accessType,
        },
        member: loginInfo,
      };
      const response = await apiClient.post("/garden/create", updatedValues, {withCredentials: true});
      if (response.data.result === true) {
        const gNo = response.data.gNo;
        router.push(`/garden/gardenMake-2?accessType=${accessType}&gNo=${gNo}`);
      } else {
        throw new Error("정원 추가 도중 문제가 생겼습니다. 다시 확인해주세요.");
      }
      // 처리 결과에 따른 로직 추가
    } catch (error) {
      alert("정원 추가 도중 문제가 생겼습니다. 다시 확인해주세요.");
      console.log(error);
    }
  };

  // pulic / private
  const [accessType, setAccessType] = useState("");
  const [accessCheck, setAccessCheck] = useState(false);

  // 꽃
  const [flower, setFlower] = useState("");
  const [flowerCheck, setFlowerCheck] = useState(false);

  // accessType, flower

  // 파일 업로드
  const [coverImg, setCoverImg] = useState(defaultImg);

  const handleImageChange = (event) => {
    setAccessType(event.target.value);
  };
  const handleSetFlower = (event) => {
    setFlower(event.target.value);
  };

  const today = new Date();
  const endDayDefault = new Date();
  endDayDefault.setMonth(today.getMonth() + 1);

  const initialValues = {
    title: "",
    capacity: 0,
    description: "",
    categories: [],
    tags: ["none"],
    startDate: today,
    endDate: endDayDefault,
    regularTime: "none",
  };

  const categories = [
    {id: 1, name: "전체", value: "all"},
    {id: 2, name: "영화", value: "movie"},
    {id: 3, name: "도서", value: "book"},
    {id: 4, name: "전시", value: "exhibition"},
    {id: 5, name: "공연", value: "perform"},
  ];

  const tags = [
    {id: 1, name: "설정 안함", value: "none"},
    {id: 2, name: "로맨스", value: "로맨스"},
    {id: 3, name: "연극", value: "연극"},
    {id: 4, name: "뮤지컬", value: "뮤지컬"},
    {id: 5, name: "클래식", value: "클래식"},
    {id: 6, name: "수상작", value: "수상작"},
    {id: 7, name: "SF", value: "SF"},
    {id: 8, name: "자기계발", value: "자기계발"},
    {id: 9, name: "전쟁", value: "전쟁"},
    {id: 10, name: "미장센", value: "미장센"},
    {id: 11, name: "히어로", value: "히어로"},
    {id: 12, name: "청소년", value: "청소년"},
    {id: 13, name: "공포", value: "공포"},
  ];

  const regularTimes = [
    {id: 1, name: "그때그때 다르게 만나요", value: "none", checked: true},
    {id: 2, name: "1주에 한 번", value: "1주에 한 번", checked: false},
    {id: 3, name: "2주에 한 번", value: "2주에 한 번", checked: false},
    {id: 4, name: "한 달에 한 번", value: "한 달에 한 번", checked: false},
  ];

  const ImgRadioButton = ({imageSrc, imageAlt, value, checked, label, onChange, desc, width, height, objectFit, text, feedback}) => {
    return (
      <Form.Check>
        <Form.Label>
          <input type="radio" value={value} checked={checked} onChange={onChange} className="d-none" required />
          <Card className={`d-flex rounded-4 overflow-hidden card-hover ${checked ? "border-primary border-3" : ""}`}>
            <ImageLoader src={imageSrc} objectFit={objectFit} width={width} height={height} alt={imageAlt} />
          </Card>
          <div className="text-center mt-3 mb-5">
            <div className={`hanamdaum fs-4 mb-1 ${checked ? "text-primary " : ""}`}>{label}</div>
            <div className="pyeongChang-regular">
              <span className="text-primary fw-bold">{desc}</span> {text}
            </div>
          </div>
        </Form.Label>
      </Form.Check>
    );
  };

  return (
    <Layout pageTitle="모임 만들기" activeNav="Account" userLoggedIn>
      <GardenMakeLayout activeStep="정원 정보 입력" nextStep="/made/gardenMake-2">
        <Formik initialValues={initialValues} validationSchema={gardenSchema} onSubmit={handleSubmit}>
          {({values, setFieldValue, handleChange, handleBlur, touched, errors, isSubmitting}) => (
            <FMForm method="post">
              <div className="pyeongChang-regular text-danger mb-3"> {accessCheck && "필수 선택 영역입니다."}</div>
              <div className="d-flex justify-content-around">
                <ImgRadioButton
                  imageSrc="/images/garden-select/public.jpg"
                  imageAlt="Public"
                  value="public"
                  checked={accessType === "public"}
                  onChange={handleImageChange}
                  label="공개 정원"
                  width={400}
                  height={200}
                  objectFit={"cover"}
                  desc="누구나"
                  text="참여할 수 있어요."
                />
                <ImgRadioButton
                  imageSrc="/images/garden-select/private.jpg"
                  imageAlt="private"
                  value="private"
                  checked={accessType === "private"}
                  onChange={handleImageChange}
                  width={400}
                  height={200}
                  objectFit={"cover"}
                  label="비밀 정원"
                  desc="내가 초대한 사람만"
                  text="참여할 수 있어요."
                />
              </div>
              <Row xs={1} sm={2} className="gy-4 mb-4">
                <Form.Group as={Col} controlId="gardenTitle">
                  <Form.Label>
                    <h2 className="h4 mb-1 hanamdaum">
                      <i className="fi-pencil text-primary fs-5 mt-n1 me-2"></i>
                      정원 이름 <span className="text-primary"> &nbsp;*</span>
                    </h2>
                    <div className="pyeongChang-regular mb-2 text-gray500">3글자 이상 30글자 이하로 입력하세요</div>
                  </Form.Label>
                  <Form.Control
                    className="pyeongChang-regular"
                    size="lg"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback className="pyeongChang-regular" type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="capacity">
                  <Form.Label>
                    <h2 className="h4 mb-1 hanamdaum">
                      <i className="fi-users text-primary fs-5 mt-n1 me-2"></i>
                      정원 최대 인원 <span className="text-primary"> &nbsp;*</span>
                    </h2>
                    <div className="pyeongChang-regular mb-2 text-gray500">100명 이하의 숫자로 입력하세요.</div>
                  </Form.Label>
                  <Form.Control
                    className="pyeongChang-regular"
                    size="lg"
                    type="text"
                    name="capacity"
                    value={values.capacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.capacity && errors.capacity}
                  />
                  <Form.Control.Feedback className="pyeongChang-regular" type="invalid">
                    {errors.capacity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group controlId="desc" className="mb-4">
                <Form.Label>
                  <h2 className="h4 mb-1 hanamdaum">
                    <i className="fi-info-square text-primary fs-5 mt-n1 me-2"></i>
                    정원 설명 <span className="text-primary"> &nbsp;*</span>
                  </h2>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className="pyeongChang-regular"
                  placeholder="500글자 이하로 입력해주세요."
                  size="lg"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback className="pyeongChang-regular" type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="categories">
                <div className="d-flex">
                  <h2 className="h4 mb-1 hanamdaum me-4">
                    <i className="fi-bookmark-filled text-primary fs-5 mt-n1 me-2"></i>
                    관심 분야 <span className="text-primary"> &nbsp;*</span>
                  </h2>
                  <span className="pyeongChang-regular text-gray500 pt-1">관심이 있는 분야를 선택해주세요.</span>
                </div>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    id={`category-${category.id}`}
                    variant={values.categories.includes(category.value) ? "primary me-2 pyeongChang-regular" : "outline-primary  me-2 pyeongChang-regular"}
                    onClick={() => {
                      if (category.value === "all") {
                        if (values.categories.includes("all")) {
                          // "All"이 선택된 상태에서 다시 클릭하여 해제
                          handleChange({
                            target: {
                              name: "categories",
                              value: [],
                            },
                          });
                        } else {
                          // "All"을 선택하여 모든 값을 선택
                          const allCategories = categories.map((c) => c.value);
                          handleChange({
                            target: {
                              name: "categories",
                              value: allCategories,
                            },
                          });
                        }
                      } else {
                        const updatedCategories = values.categories.includes("all") ? values.categories.filter((c) => c !== "all") : [...values.categories];

                        if (updatedCategories.includes(category.value)) {
                          // 이미 선택된 값을 클릭하여 해제
                          handleChange({
                            target: {
                              name: "categories",
                              value: updatedCategories.filter((c) => c !== category.value),
                            },
                          });
                        } else {
                          // 선택되지 않은 값을 클릭하여 추가
                          handleChange({
                            target: {
                              name: "categories",
                              value: [...updatedCategories, category.value],
                            },
                          });
                        }
                      }
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
                {errors.categories && <p className="text-danger pyeongChang-regular fs-sm mt-2">{errors.categories}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex mt-5">
                  <h2 className="h4 mb-1 hanamdaum me-4 ">
                    <i className="fi-ticket text-primary fs-5 mt-n1 me-2"></i>
                    키워드
                  </h2>
                  <span className="pyeongChang-regular text-gray500 pt-1"> 정원에 적절하다고 생각되는 키워드를 설정해주세요.</span>
                </Form.Label>
                {tags.map((tag) => (
                  <Button
                    key={tag.id}
                    id={`tag-${tag.id}`}
                    variant={values.tags.includes(tag.value) ? "primary me-2 mb-2 pyeongChang-regular" : "outline-primary mb-2 me-2 pyeongChang-regular"}
                    onClick={() => {
                      if (tag.value === "none") {
                        handleChange({
                          target: {
                            name: "tags",
                            value: ["none"],
                          },
                        });
                      } else {
                        const updatedTags = values.tags.includes("none") ? [] : [...values.tags];

                        if (updatedTags.includes(tag.value)) {
                          // 이미 선택된 값을 클릭하여 해제
                          handleChange({
                            target: {
                              name: "tags",
                              value: updatedTags.filter((t) => t !== tag.value),
                            },
                          });
                        } else {
                          // 선택되지 않은 값을 클릭하여 추가
                          handleChange({
                            target: {
                              name: "tags",
                              value: [...updatedTags, tag.value],
                            },
                          });
                        }
                      }
                    }}
                  >
                    {tag.name}
                  </Button>
                ))}
              </Form.Group>
              <Form.Label className="d-flex mt-5">
                <h2 className="h4 mb-1 hanamdaum me-4 ">
                  <i className="fi-calendar-alt text-primary fs-5 mt-n1 me-2"></i>
                  기간
                </h2>
                <span className="pyeongChang-regular text-gray500 pt-1"> 모임 시작일과 종료일을 지정해주세요. 기본 설정은 한달입니다. </span>
              </Form.Label>
              <Row xs={1} sm={2} className="gy-4 mb-4">
                <Form.Group as={Col}>
                  <InputGroup>
                    <Field name="startDate">
                      {({field}) => (
                        <>
                          <Form.Control
                            as={DatePicker}
                            {...field}
                            selected={field.value}
                            onChange={(date) => setFieldValue(field.name, date)}
                            placeholderText="Choose date"
                            className="form-control rounded pe-5"
                          />
                          <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
                        </>
                      )}
                    </Field>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                  <InputGroup>
                    <Field name="endDate">
                      {({field}) => (
                        <>
                          <Form.Control
                            as={DatePicker}
                            {...field}
                            selected={field.value}
                            onChange={(date) => setFieldValue(field.name, date)}
                            placeholderText="Choose date"
                            className="form-control rounded pe-5"
                          />
                          <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
                        </>
                      )}
                    </Field>
                  </InputGroup>
                  <div className="d-flex justify-content-end pyeongChang-regular">
                    <Form.Check
                      type="checkbox"
                      label="종료 날짜 설정하지 않기"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("endDate", null);
                        } else {
                          setFieldValue("endDate", new Date());
                        }
                      }}
                    />
                  </div>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>
                  <h2 className="h4 mb-1 hanamdaum">
                    <i className="fi-chat-circle text-primary fs-5 mt-n1 me-2"></i>
                    모임 일정
                  </h2>
                </Form.Label>
                <div className="d-flex flex-row">
                  {regularTimes.map((regularTime, index) => (
                    <Form.Check
                      className="pyeongChang-regular me-3"
                      type="radio"
                      label={regularTime.name}
                      id={`regularTime${index}`}
                      name="regularTime"
                      value={regularTime.value}
                      key={index}
                      checked={values.regularTime === regularTime.value}
                      onChange={() => setFieldValue("regularTime", regularTime.value)}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  <h2 className="h4 mb-3 hanamdaum">
                    <i className="fi-quote text-primary fs-5 mt-n1 me-2"></i>
                    헤더 이미지 선택
                  </h2>
                  <FilePond
                    files={coverImg}
                    onupdatefiles={setCoverImg}
                    maxFileSize="1MB"
                    name="coverImg"
                    labelIdle='<i class="d-inline-block fi-camera-plus fs-2 text-muted mb-2 mt-5"></i><br><span class="fw-bold">Change picture</span>'
                    acceptedFileTypes={["image/png", "image/jpeg"]}
                    stylePanelLayout="compact"
                    imagePreviewHeight={350}
                    imageCropAspectRatio="2:1"
                    imageResizeTargetWidth={1500}
                    imageResizeTargetHeight={800}
                    className="file-uploader bg-secondary headerImgUpload"
                    allowImageCompression={true}
                    imageCompressionQuality={0.5} // 압축 품질 (0부터 1까지, 1이 가장 우수한 품질)
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  <h2 className="h4 mb-3 hanamdaum">
                    <i className="fi-plant text-primary fs-5 mt-n1 me-2"></i>
                    기를 꽃 선택 <span className="text-primary"> &nbsp;*</span>
                    <span className="pyeongChang-regular text-danger text-end ms-3 fs-sm">{flowerCheck && "필수 항목입니다. 원하시는 꽃을 선택해주세요."}</span>
                    <span className="pyeongChang-regular fs-6"> 작품이 5개 이상이어야 꽃이 자라는 모습을 제대로 볼 수 있어요. </span>
                  </h2>
                </Form.Label>
                <div className="d-flex justify-content-around">
                  <ImgRadioButton
                    imageSrc="/images/꽃/동백4.png"
                    imageAlt="동백"
                    value="동백"
                    checked={flower === "동백"}
                    onChange={handleSetFlower}
                    width={200}
                    height={250}
                    objectFit={"scale-down"}
                    label="동백"
                  />
                  <ImgRadioButton
                    imageSrc="/images/꽃/무궁화4.png"
                    imageAlt="무궁화"
                    value="무궁화"
                    checked={flower === "무궁화"}
                    onChange={handleSetFlower}
                    width={200}
                    height={250}
                    objectFit={"scale-down"}
                    label="무궁화"
                  />
                  <ImgRadioButton
                    imageSrc="/images/꽃/수국4.png"
                    imageAlt="수국"
                    value="수국"
                    checked={flower === "수국"}
                    onChange={handleSetFlower}
                    width={200}
                    height={250}
                    objectFit={"scale-down"}
                    label="수국"
                  />
                  <ImgRadioButton
                    imageSrc="/images/꽃/은방울꽃4.png"
                    imageAlt="은방울꽃4"
                    value="은방울꽃"
                    checked={flower === "은방울꽃"}
                    onChange={handleSetFlower}
                    width={200}
                    height={250}
                    objectFit={"scale-down"}
                    label="은방울꽃"
                  />
                </div>
              </Form.Group>
              <div className="d-flex bg-light rounded-3 pyeongChang-regular mt-3">
                <Button size="lg" variant="primary rounded-pill ms-auto" className="mt-sm-0 mt-3" type="submit">
                  다음
                  <i className="fi-chevron-right fs-sm ms-2 me-n1"></i>
                </Button>
              </div>
            </FMForm>
          )}
        </Formik>
      </GardenMakeLayout>
    </Layout>
  );
};

export default gardenMakeOne;
