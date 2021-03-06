/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { generateModal } from '../utils/models';

const dataQuery = `
  query Service($serviceId: ID!, $duration: Duration!) {
    getServiceResponseTimeTrend(serviceId: $serviceId, duration: $duration) {
      trendList
    }
    getServiceThroughputTrend(serviceId: $serviceId, duration: $duration) {
      trendList
    }
    getServiceSLATrend(serviceId: $serviceId, duration: $duration) {
      trendList
    }
    getServiceTopology(serviceId: $serviceId, duration: $duration) {
      nodes {
        id
        name
        type
        ... on ServiceNode {
          sla
          calls
          numOfServiceAlarm
        }
      }
      calls {
        source
        target
        isAlert
        callType
        cpm
        avgResponseTime
      }
    }
  }
`;

export default generateModal({
  namespace: 'service',
  state: {
    getServiceResponseTimeTrend: {
      trendList: [],
    },
    getServiceThroughputTrend: {
      trendList: [],
    },
    getServiceSLATrend: {
      trendList: [],
    },
    getServiceTopology: {
      nodes: [],
      calls: [],
    },
  },
  dataQuery,
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, state }) => {
        if (pathname === '/monitor/service' && state) {
          dispatch({
            type: 'saveVariables',
            payload: {
              values: {
                serviceId: state.key,
              },
              labels: {
                serviceId: state.label,
              },
            },
          });
        }
      });
    },
  },
});
