import { Link } from "react-router-dom";

const Categories = () => {
  const catContent = [
    { id: 1, name: "Hotel", number: "92" },
    { id: 2, name: "Car", number: "55" },
    { id: 3, name: "Holiday Rental", number: "75" },
    { id: 4, name: "Travel Guides", number: "62" },
    { id: 5, name: "Flights", number: "34" },
  ];
  return (
    <>
      {catContent.map((item) => (
        <Link
          to="/blog"
          className="d-flex items-center justify-between text-dark-1"
          key={item.id}
        >
          <span className="text-15 text-dark-1">{item.name}</span>
          <span className="text-14 text-light-1">{item.number}</span>
        </Link>
      ))}
    </>
  );
};

export default Categories;
