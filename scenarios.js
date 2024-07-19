import http from 'k6/http';

export const options = {
 // scenarios: {
    per_vu_scenario: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 1,
      //startTime: '10s',
    },
  },
//};

export default function () {
  http.get('https://test.k6.io/');
}