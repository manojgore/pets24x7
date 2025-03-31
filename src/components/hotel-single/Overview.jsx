import parse from "html-react-parser";

const Overview = ({ venue }) => {
  console.log('Venue overview :', venue)
  return (
    <>
      <h3 className="text-24 fw-600 pt-20 border-top-light">Overview</h3>
      <p className="text-dark-1 text-15 mt-10">
        {venue?.venue_overview && parse(venue?.venue_overview) || "loading..."}
      </p>
    </>
  );
};

export default Overview;
