import axios_instance from "./helpers/axios_instance";

const getTestLesson = async (setData) => {
  try {
    const res = await axios_instance.get("admin/get-test-lessons");
    if (res.status == 200) {
      setData(res.data.test_lesson);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteTestLesson = async (id, setData) => {
  try {
    const res = await axios_instance.delete(`admin/test-lesson-delete/${id}`);
    if (res.status == 200) {
      getTestLesson(setData);
    }
  } catch (error) {
    console.log(error);
  }
};
const accepted_test_tesson = async (id, setData) => {
  try {
    const res = await axios_instance.post(
      `admin/test-lesson-accepted/${id}?_method=PUT`
    );
    if (res.status == 200) {
      alert("Sinov darsi faollashtirildi.");
      getTestLesson(setData);
    }
  } catch (error) {
    alert("Sinov darsini faollashtirib bo'lmadi.");

    console.log(error);
  }
};
const canceled_test_tesson = async (id, setData) => {
  try {
    const res = await axios_instance.post(
      `admin/test-lesson-canceled/${id}?_method=PUT`
    );
    if (res.status == 200) {
      alert("Sinov darsi nofaollashtirildi.");
      getTestLesson(setData);
    }
  } catch (error) {
    alert("Sinov darsini nofaollashtirib bo'lmadi.");

    console.log(error);
  }
};

export { getTestLesson, deleteTestLesson, accepted_test_tesson ,canceled_test_tesson};
