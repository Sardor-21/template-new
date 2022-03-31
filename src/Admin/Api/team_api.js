import axios_instance from "./helpers/axios_instance";

const get_team = async (setTeam, setModal) => {
  try {
    const res = await axios_instance.get("admin/get-teams");
    if (res.status == 200) {
      setTeam(res.data.teams);
      setModal(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const add_team = async (data, setModal, setTeam) => {
  try {
    const res = await axios_instance.post("admin/add-team", data);
    if (res.status == 200) {
      get_team(setTeam, setModal);
      setModal(false);
      alert("Malumotlar saqlandi!");
    }
  } catch (error) {
    console.log(error);
    alert("Malumotlar saqlanmadi!");
  }
};

const edit_team = async (id, data, setModal) => {
  try {
    const res = await axios_instance.put(`admin/update-team/` + id, data);
    if (res.status == 200) {
      setModal(false);
      alert("O'zgartirildi!");
    }
  } catch (error) {
    console.log(error);
    alert("O'zgartirib bo'lmadi!");
  }
};

const delete_team = async (id, setModal, setTeam) => {
  try {
    const res = await axios_instance.delete("admin/delete-team/" + id);
    if (res.status == 200) {
      alert("O'chirildi!");
      get_team(setTeam, setModal);
    }
  } catch (error) {
    console.log(error);
    alert("O'chirib bo'lmadi!");
  }
};

export { add_team, get_team, edit_team, delete_team };
