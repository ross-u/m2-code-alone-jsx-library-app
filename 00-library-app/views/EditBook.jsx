const React = require("react");
const Layout = require("./Layout");

function EditBook(props) {
  return (
    <Layout>
      <form action="/books/edit" method="POST">
        <label>Title:</label>
        <input type="text" name="title" />
        <br />

        <label>Author:</label>
        <input type="text" name="author" />
        <br />

        <label>Description:</label>
        <input type="text" name="description" />
        <br />

        <label>Rate:</label>
        <input type="number" name="rating" />
        <br />

        <button class="edit-button" type="submit">
          EDIT
        </button>
      </form>
    </Layout>
  );
}

module.exports = EditBook;