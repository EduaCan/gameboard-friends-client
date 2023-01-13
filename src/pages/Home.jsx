import { Link } from "react-router-dom";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { DarkThemeContext } from "../context/darkTheme.context";
import SEO from "../components/SEO";

//minimalistic home page
function Home() {
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);

  return (
    <div style={changeTheme()}>
      <SEO
        title="Welcome to Boardgame Friends"
        description="Boardgames lists and players meeting point to comment and chat about your favorite games"
        name="Boardgame Friends"
        type="website"
      />
      <img
        id="home-img"
        src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2019/08/board-games-los-angeles-thom-1068x712.jpg"
        alt="Home"
      />
      <Link to="/game">
        <Button variant={changeThemeButton()} style={{ minWidth: "40vw", display: "inline", justifySelf: "center" }}>
          Explore Game List Now!
        </Button>
      </Link>
    </div>
  );
}

export default Home;
