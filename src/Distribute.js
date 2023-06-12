import { useState, useRef, useEffect } from "react";
import HowTo from "./HowTo";
import { currencyFormatter } from "./currency.formatter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";

function Distribute() {
  const [amount, setAmount] = useState(0);
  const [project, setProject] = useState("");
  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const nameField = useRef();
  const percentageField = useRef();
  const nameFieldUpdate = useRef();
  const percentageFieldUpdate = useRef();

  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);
    const name = nameField.current.value;
    const percentage = percentageField.current.value;

    if (name === "" || percentage === "") {
      setError("Please enter a name and percentage");
      return;
    }

    if (error) return;

    const myAmount = (parseInt(percentage) / 100) * parseInt(amount);
    setBreakdown([
      ...breakdown,
      { name, percentage, amount: myAmount, received: false },
    ]);
    nameField.current.value = "";
    percentageField.current.value = "";
  };
  const submitToServer = (e) => {
    e.preventDefault();
    setError(null);
    const data = {
      project,
      total,
      totalPercentage,
      balance,
      breakdown,
    };
    console.log(data);
  };
  const calculateTotal = () => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.amount));
    }, 0);
  };

  const calculateTotalPercentage = () => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.percentage));
    }, 0);
  };

  const handleReset = (e) => {
    setBreakdown([]);
    setAmount(0);
    setTotal(0);
    setBalance(0);
    setError(null);
  };

  const handleRemove = (e) => {
    setError(null);
    const index = e.target.getAttribute("data-index");
    const myBreakdown = [...breakdown];
    myBreakdown.splice(index, 1);
    setBreakdown(myBreakdown);
  };

  const handleEdit = (e) => {
    setError(null);
    setEdit(e.target.getAttribute("data-edit-index"));
  };
  const handleReceived = (e) => {
    setError(null);
    const index = e.target.getAttribute("data-received-index");
    console.log(index);
    const myBreakdown = [...breakdown];
    const received = myBreakdown[index].received;
    console.log(received);
    myBreakdown[index].received = !received;
    setBreakdown(myBreakdown);
  };

  useEffect(() => {
    const theTotal = calculateTotal();
    const totalPercentage = calculateTotalPercentage();
    if (theTotal > amount) {
      setError("Shared Amount can not to exceed Amount to be shared!");
    } else {
      setTotal(theTotal);
      setTotalPercentage(totalPercentage);
      setBalance(amount - theTotal);
    }
  }, [breakdown, error]);

  const handleSave = () => {
    setError(null);
    const index = edit;
    const myBreakdown = [...breakdown];
    const name = nameFieldUpdate.current.value;
    const percentage = percentageFieldUpdate.current.value;
    if (name === "" || percentage === "") {
      setError("Name and Percentage are required!");
      return;
    }

    myBreakdown[index].name = name;
    myBreakdown[index].percentage = percentage;
    myBreakdown[index].amount = (parseInt(percentage) / 100) * parseInt(amount);

    setBreakdown(myBreakdown);
    setEdit(null);
  };

  return (
    <>
      {!amount && <HowTo />}
      {/* 			<Row className="w-75 mx-auto py-4">
				<Col>
					<p className="text-white">Pool</p>
					<h3 className="text-white">{currencyFormatter(amount)}</h3>
				</Col>
				<Col>
					<p className="text-white">Distributed {totalPercentage}%</p>
					<h3 className="text-white">{currencyFormatter(total)}</h3>
				</Col>
				<Col>
					<p className="text-white">
						Undistributed {100 - totalPercentage}%
					</p>
					<h3 className="text-white">
						{" "}
						{currencyFormatter(
							breakdown?.length === 0 ? amount : balance
						)}
					</h3>
				</Col>
				<Col>
					<Button
						type="reset"
						onClick={handleReset}
						variant="warning"
						className="w-50 mx-auto">
						Reset
					</Button>
				</Col>
			</Row> */}

      <Row className="mt-4">
        <Col md="9">
          {!amount && (
            <>
              <Row>
                <FloatingLabel
                  controlId="floatingInput"
                  label="What is the source of the money?"
                  className="col-md-6"
                >
                  <Form.Control
                    placeholder="Project title"
                    onBlur={(e) => setProject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setProject(e.target.value);
                      }
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter Amount to be shared"
                  className="col-md-6"
                >
                  <Form.Control
                    placeholder="UGX 1,000,000"
                    onBlur={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setAmount(e.target.value);
                      }
                    }}
                  />
                </FloatingLabel>
              </Row>
              <div className="d-grid col-12 mt-2">
                <button className="w-full text-md py-2 text-white rounded-md bg-[#007BFF] hover:bg-[#0B5ED7]">
                  Enter
                </button>
              </div>
            </>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          {amount > 0 && (
            <div className="p-2 bg-light border rounded">
              <h4 className="text-secondary">Add Benecificiaries </h4>
              <p>Beneficiary name and portion in percentage</p>
              <Form onSubmit={handleAdd}>
                <div className="input-group">
                  <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control ref={nameField} placeholder="e.g John Doe" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Percentage">
                    <Form.Control
                      ref={percentageField}
                      placeholder="10%"
                      required
                    />
                  </FloatingLabel>
                  <button type="submit" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </Form>
            </div>
          )}
          {breakdown.length > 0 && (
            <Table className="mt-4 striped bordered hover" size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Percentage</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((person, index) => {
                  return edit === index ? (
                    <tr key={index.toString()}>
                      <td colSpan="2">
                        <FormControl
                          size="sm"
                          ref={nameFieldUpdate}
                          defaultValue={breakdown[index].name}
                        />
                      </td>
                      <td>
                        <FormControl
                          size="sm"
                          ref={percentageFieldUpdate}
                          defaultValue={breakdown[index].percentage}
                        />
                      </td>
                      <td>
                        <button
                          variant="success"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index.toString()}>
                      <td>{person.name}</td>
                      <td>{person.percentage}%</td>
                      <td>{currencyFormatter(person.amount)}</td>
                      <td>
                        <button
                          data-index={index}
                          onClick={handleRemove}
                          variant="outline-danger"
                          size="sm"
                          className="me-1"
                        >
                          Delete
                        </button>
                        <button
                          data-edit-index={index}
                          onClick={handleEdit}
                          variant="outline-info"
                          className="me-1"
                          size="sm"
                        >
                          Edit
                        </button>
                        {person.received && (
                          <button
                            data-received-index={index}
                            onClick={handleReceived}
                            variant="outline-info"
                            size="sm"
                          >
                            Cashback
                          </button>
                        )}
                        {!person.received && (
                          <button
                            data-received-index={index}
                            onClick={handleReceived}
                            variant="outline-info"
                            size="sm"
                          >
                            Give Cash
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th>Distributed </th>
                  <th>{totalPercentage}%</th>
                  <th>{currencyFormatter(total)}</th>
                  <th></th>
                </tr>
                <tr>
                  <th>Undistributed</th>
                  <th>{100 - totalPercentage}%</th>
                  <th>
                    {currencyFormatter(
                      breakdown?.length === 0 ? amount : balance
                    )}
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </Table>
          )}
        </Col>
        <Col md="3">
          <div className="p-2 bg-light border rounded">
            <h5>Summary</h5>
            <hr />
            <p>
              <span className="text-muted">Project</span>
              <br />
              {project}
            </p>
            <p>
              <span className="text-muted">Shared Amount</span>
              <br />
              <span className="text-dark">{currencyFormatter(amount)}</span>
            </p>
            <p>
              <span className="text-muted">Distributed</span>
              <br />
              <span className="text-dark">
                {currencyFormatter(total)} / {totalPercentage}%
              </span>
            </p>
            <p>
              <span className="text-muted">Number of beneficiaries</span>
              <br />
              <span className="text-dark">
                {breakdown?.length} Beneficiaries
              </span>
            </p>
            <p>
              <span className="text-muted font-italic">Unshared Amount</span>
              <br />
              <span className="text-dark">
                {currencyFormatter(breakdown?.length === 0 ? amount : balance)}{" "}
                / {100 - totalPercentage}%
              </span>
            </p>

            <Row>
              <Col md="6">
                <button
                  type="reset"
                  onClick={handleReset}
                  variant="warning"
                  className="w-100 mx-auto"
                >
                  Reset
                </button>
              </Col>
              <Col md="6">
                <button
                  type="submit"
                  onClick={submitToServer}
                  variant="success"
                  className=""
                >
                  Save
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Distribute;
