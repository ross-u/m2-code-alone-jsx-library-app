const React = require("react");

function AddAuthor(props) {
  return (
    <form action={`/authors/add?bookid=${props.idOfTheBook}`} method="POST">
      <label>Name:</label>
      <input type="text" name="name" />
      <br />

      <label>Last name:</label>
      <input type="text" name="last name" />
      <br />

      <label>Nationality:</label>
      <input type="text" name="nationality" />
      <br />

      <label>Birthday:</label>
      <input type="number" name="birthday" />
      <br />

      <label>Image:</label>
      <input type="number" name="image" />
      <br />

      <button type="submit">ADD</button>
    </form>
  );
}

module.exports = AddAuthor;