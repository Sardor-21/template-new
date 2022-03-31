const scroll_to_section = (section) => {
    window.scrollTo({
      top: section.current.offsetTop,
      behavior: "smooth",
    });
  };

  export default scroll_to_section;