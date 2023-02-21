import React, { useRef } from "react";

import classes from "./Form.module.css";

const Form = () => {
  const title = useRef();
  const openingText = useRef();
  const releaseDate = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log({
      title: title.current.value,
      openingText: openingText.current.value,
      releaseDate: releaseDate.current.value,
    });

    title.current.value = "";
    openingText.current.value = "";
    releaseDate.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" ref={title} />
      <label htmlFor="openingText">Opening Text</label>
      <textarea
        id="openingText"
        type="text"
        className={classes.openingText}
        ref={openingText}
      ></textarea>
      <label htmlFor="releaseDate">Release Date</label>
      <input
        id="releaseDate"
        type="date"
        ref={releaseDate}
        className={classes.date}
      />
      <div>
        <button type="submit">Add Movie</button>
      </div>
    </form>
  );
};

export default Form;