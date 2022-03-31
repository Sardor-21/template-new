
const BlogValidation = (error) => {
  let errors = {};

  if (!error.image) {
    errors.image = true;
  }
  if (!error.user_id) {
    errors.user_id = true;
  }
  if (!error.tag_id) {
    errors.tag_id = true;
  }
  if (!error.category_id) {
    errors.category_id = true;
  }
  if (!error.title) {
    errors.title = true;
  }
  if (!error.content) {
    errors.content = true;
  }
  return errors;
};

export default BlogValidation;
