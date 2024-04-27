// import styles from "./PageBody.module.css";
import "./PageBody.css"

const PageBody = (props) => {
  // const classes = "page-body" + props.className;
  const classes = "page-body"
  return <div className={classes}>{props.children}</div>
};

export default PageBody;
