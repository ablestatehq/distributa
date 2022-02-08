import { useState, useRef, useEffect } from 'react'
import HowTo from './HowTo'
import { currencyFormatter } from './currency.formatter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'

function App() {

  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPercentage, setTotalPercentage] = useState(0)
  const [balance, setBalance] = useState(0)
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(null)
  const [breakdown, setBreakdown] = useState([])
  const nameField = useRef()
  const percentageField = useRef()
  const nameFieldUpdate = useRef()
  const percentageFieldUpdate = useRef()

  const handleAdd = (e) => {
    e.preventDefault()
    setError(null)
    const name = nameField.current.value
    const percentage = percentageField.current.value

    if (name == '' || percentage == '') {
      setError('Please enter a name and percentage')
      return
    }

    if (error) return

    const myAmount = parseInt(percentage) / 100 * parseInt(amount)
    setBreakdown([...breakdown, { name, percentage, 'amount': myAmount }])
    nameField.current.value = ''
    percentageField.current.value = ''

  }

  const calculateTotal = () => {
    return breakdown.reduce((acc, curr) => {
      return acc += parseInt(curr.amount)
     }, 0)
  }

  const calculateTotalPercentage = () => {
    return breakdown.reduce((acc, curr) => {
      return acc += parseInt(curr.percentage)
    }, 0)
  }

  const handleReset = (e) => {
    setBreakdown([])
    setAmount(0)
    setTotal(0)
    setBalance(0)
    setError(null)
  }

  const handleRemove = e => {
    setError(null)
    const index = e.target.getAttribute('data-index')
    const myBreakdown = [...breakdown]
    myBreakdown.splice(index, 1)
    setBreakdown(myBreakdown)
  }

  const handleEdit = (e) => {
    setError(null)
    setEdit(e.target.getAttribute('data-edit-index'))
  }

  useEffect(() => {
    const theTotal = calculateTotal()
    const totalPercentage = calculateTotalPercentage()
    if (theTotal > amount) {
      setError('Distributed can not to exceed Amount to be shared!')
    } else {
      setTotal(theTotal)
      setTotalPercentage(totalPercentage)
      setBalance(amount - theTotal)
    }
  }, [breakdown,error])

  const handleSave = () => {
    setError(null)
    const index = edit
    const myBreakdown = [...breakdown]
    const name = nameFieldUpdate.current.value
    const percentage = percentageFieldUpdate.current.value
    if (name == '' || percentage == '') {
      setError('Name and Percentage are required!')
      return
    }

    myBreakdown[index].name = name
    myBreakdown[index].percentage = percentage
    myBreakdown[index].amount = parseInt(percentage) / 100 * parseInt(amount)

    setBreakdown(myBreakdown)
    setEdit(null)
  }

  return (
    <>
      <Container fluid className="bg-dark fixed-top" >
        {!amount ?
          <Row>
            <Col className="d-flex text-center justify-content-center p-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter Amount to be shared"
                  className="col-md-3"
                >
                    <Form.Control
                    placeholder="UGX 1,000,000"
                    onBlur={e => setAmount(e.target.value)}
                    onKeyDown={e => {
                      if (e.key == 'Enter') {
                        setAmount(e.target.value)
                      }
                    }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          :
            <Row className="w-75 mx-auto py-4">
              <Col>
                <p className="text-white">Pool</p>
                <h3 className="text-white">{currencyFormatter(amount)}</h3>
              </Col>
              <Col>
                <p className="text-white">Distributed {totalPercentage}%</p>
                <h3 className="text-white">{currencyFormatter(total)}</h3>
              </Col>
              <Col>
                <p className="text-white">Undistributed {100 - totalPercentage}%</p>
                <h3 className="text-white">                       {currencyFormatter(breakdown?.length === 0 ? amount : balance)}
                </h3>
              </Col>
              <Col>
                <Button
                  type="reset"
                  onClick={handleReset}
                  variant="warning"
                  className="w-50 mx-auto"
              >Reset</Button>
              </Col>
            </Row>
          }
      </Container>
      <Container className="d-flex flex-column align-items-center mt-150">
          {error && <Alert variant="danger">{error}</Alert>}
          {amount > 0 ? <Form onSubmit={handleAdd}>
            <div className="input-group">
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
              >
                <Form.Control
                  ref={nameField}
                  placeholder="e.g John Doe"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Percentage"
              >
                <Form.Control
                  ref={percentageField}
                  placeholder="10%"
                  required
                />
              </FloatingLabel>
              <Button
                type="submit"
                onClick={handleAdd}
              >
                Add
              </Button>
            </div>
        </Form>
          :
          <HowTo />
          }
      </Container>
      <Container className="d-flex justify-content-center">
        { breakdown.length > 0 && <Table className="w-75 mt-4 striped bordered hover" size="sm">
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
                return edit == index ?
                  <tr key={index.toString()}>
                    <td colSpan="2">
                      <FormControl
                        size='sm'
                        ref={nameFieldUpdate}
                        defaultValue={breakdown[index].name}
                      />
                    </td>
                    <td>
                      <FormControl
                        size='sm'
                        ref={percentageFieldUpdate}
                        defaultValue={breakdown[index].percentage}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleSave}>Save</Button>
                    </td>
                  </tr>
                :
                  <tr key={index.toString()}>
                    <td>{person.name}</td>
                    <td>{person.percentage}%</td>
                    <td>{currencyFormatter(person.amount)}</td>
                    <td>
                        <Button
                          data-index={index} onClick={handleRemove}
                          variant="outline-danger"
                          size="sm"
                          className='me-1'
                        >Delete</Button>
                        <Button
                          data-edit-index={index} onClick={handleEdit}
                        variant="outline-info"
                        size="sm"
                        >Edit</Button>
                    </td>
                  </tr>
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
                {currencyFormatter(breakdown?.length === 0 ? amount : balance)}
                </th>
                <th></th>
              </tr>
            </tfoot>
        </Table>
        }
      </Container>
    </>
  );
}

export default App;
