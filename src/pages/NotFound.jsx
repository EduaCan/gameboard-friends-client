import SEO from "../components/SEO";

//Muestra error de ruta inexistente
function NotFound() {
  return (
    <div>
    <SEO
        title="Page Not Found"
        description="Page URL is incorrect"
        name="Boardgame Friends"
        type="website"
      />
      <h1>There are not the drones you're looking for. (404)</h1>
    </div>
  );
}

export default NotFound;
