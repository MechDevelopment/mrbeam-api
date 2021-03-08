# MrBeamAPI

REST API for mrbeam project. We want to create an online service for calculating beams using the finite element method, accessible to everyone.

## Usage
```javascript
const URL = "https://mrbeam-api.herokuapp.com/generate";
```
This API will allow generating json data of the correct beams for tests. Some example of a GET request:
```javascript
fetch(URL).then(res => res.json()).then(data => console.log(data));
```

Use POST request to configure the generator:
```javascript
fetch(URL, {
  method: "POST",
  headers: { "Content-Type": "application/json;charset=utf-8" },
  body: JSON.stringify({ complexity: 'elementary', beamLength: 10, unitsCount: 4 })
})
  .then(res => res.json())
  .then(data => console.table(data));
```
Body is an object with optional parameters:

| 'complexity'   | 'unitsCount' | features               |
|----------------|--------------|------------------------|
| 'random'       | 2 - 10       | all                    |
| 'elementary'   | 2 - 6        | 'moment', 'force'      |
| 'intermediate' | 4 - 8        | 'distload', 'material' |
| 'advanced'     | 6 - 10       | 'hinge'                |

'unitsCount' is more important than 'complexity'.

## Units
```typescript
interface Unit {
  readonly id: string
  type: UnitType
  x: number | number[]
  value?: number | number[]
}
```

```typescript
type UnitType =
  | 'point'
  | 'force'
  | 'moment'
  | 'distload'
  | 'fixed'
  | 'simple'
  | 'hinge'
  | 'material'
```
Examples:

| type                       | x            | value              |
|----------------------------|--------------|--------------------|
| 'point'                    | 5            | undefined          |
| 'force', 'moment'          | 10           | -10                |
| 'distload'                 | [0, 10]      | -10 || [-10, 10]   |
| 'fixed', 'simple', 'hinge' | 2            | undefined          |
| 'material'                 | [0, 10]      | [12345, 0.2, 0.1]  |

## Contributing
If errors are found, please open an issue to discuss.

## License
[MIT](https://choosealicense.com/licenses/mit/)
