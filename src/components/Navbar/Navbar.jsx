import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <a href="/task/create">Add task</a>
        <a href="/">List tasks</a>
      </div>
    </>
  );
};

export default Navbar;
