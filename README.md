# MrBeamAPI

REST API for MrBEAM.

## Usage
To generate the beam use the GET or POST request by URL:
```
https://mrbeam-api.herokuapp.com/generate
```
Settings for POST request:
```javascript
{
  level: 'elementary', // 'intermediate' | 'advanced' | 'random'
  unitsCount: 5,
  beamLength: 10
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
