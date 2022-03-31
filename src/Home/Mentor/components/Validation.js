const scroll_to_top = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const scroll_to_center = () => {
  window.scrollTo({
    top: 500,
    behavior: "smooth",
  });
};

const Validation = (value) => {
  console.log(value);

  let errors = {};
  if (!value.image) {
    errors.image = true;
    scroll_to_top();
  }
  if (!value.first_name) {
    errors.first_name = true;
    scroll_to_top();
  }
  if (!value.last_name) {
    errors.last_name = true;
    scroll_to_top();
  }
  if (!value.birth_date) {
    errors.birth_date = true;
    scroll_to_top();
  }
  if (!value.course_id) {
    errors.course_id = true;
    scroll_to_top();
  }
  if (!value.email) {
    errors.email = true;
    scroll_to_top();
  }
  if (!value.phone_number) {
    errors.phone_number = true;
    scroll_to_top();
  }
  if (!value.telegram_number) {
    errors.telegram_number = true;
    scroll_to_top();
  }
  if (!value.experience) {
    errors.experience = true;
  }
  if (!value.language || value.language === [] || value.language === "[]") {
    errors.language = true;
  }
  if (!value.price) {
    errors.price = true;
  }
  if (!value.resume) {
    errors.resume = true;
    // scroll_to_center();
  }
  if (!value.about_us) {
    errors.about_us = true;
  }
  if (!value.description) {
    errors.description = true;
  } else if (value.description.length < 200) {
    errors.description_length = true;
  }
  if (!value.region) {
    errors.region = true;
  }
  if (!value.country) {
    errors.country = true;
  }
  if (!value.graduate) {
    errors.graduate = true;
  }
  return errors;
};

export default Validation;
