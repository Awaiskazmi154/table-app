import React, { useState, useEffect } from "react";

const people = [
  {
    name: "Robert",
    age: 23,
    gender: "Male",
  },
  {
    name: "Max",
    age: 30,
    gender: "Male",
  },
  {
    name: "Lucas",
    age: 18,
    gender: "Male",
  },
  {
    name: "Emily",
    age: 18,
    gender: "Female",
  },
  {
    name: "Julia",
    age: 34,
    gender: "Female",
  },
];

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [people_, setPeople_] = useState(people);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput === "") {
      setPeople_(people);
      return;
    }

    let searchedPeople = people.filter((person) =>
      person.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setPeople_(searchedPeople);
  }, [searchInput]);

  useEffect(() => {
    const sortedPeople = [...people_].sort((a, b) => {
      const order = sortDirection === "asc" ? 1 : -1;

      if (sortBy === "name") {
        return order * a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return order * (a.age - b.age);
      } else if (sortBy === "gender") {
        return order * a.gender.localeCompare(b.gender);
      }

      return 0;
    });

    setPeople_(sortedPeople);
  }, [sortBy, sortDirection, people_]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 ">
        <input
          value={searchInput}
          onChange={handleSearch}
          className="border border-black px-2 py-1"
          placeholder="Search"
        />
        <button className="bg-blue-500 text-white px-4 py-2">Search</button>

        <label htmlFor="sort">Sort By</label>

        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-black px-2 py-1"
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="gender">Gender</option>
        </select>

        <button onClick={toggleSortDirection} className="border px-2 py-1">
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <table className="mt-4 w-[60%] border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Age</th>
            <th className="p-3 border border-gray-300">Gender</th>
          </tr>
        </thead>
        <tbody>
          {people_.map((person, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="p-3 border border-gray-300">{person.name}</td>
              <td className="p-3 border border-gray-300">{person.age}</td>
              <td className="p-3 border border-gray-300">{person.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
