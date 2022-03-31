import { Students_list } from "../../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const get_students = async () => {
  try {
    const res = await axios_instance.post("admin/students-list");
    if (res.status == 200) {
      Students_list(res?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export { get_students };
