
### **Benchmark Report: Performance Comparison Between NestJS and ExpressJS Services**

This report evaluates the performance of two backend services, `NestJS` and `ExpressJS`, based on a load test for both **POST** and **GET** endpoints.

The `ExpressJS` service is a baseline project without any optimizations.
While the `NestJS` service includes optimizations:
- Cache-aside, rate limiting for both **GET** and **POST** requests.
- More security, and validation for **POST** requests. 

---

### **POST** Test Results

| Metric                  | NestJS      | ExpressJS    |
| ----------------------- | ----------- | ------------ |
| **Avg Latency**         | 153.03 ms   | 51.72 ms     |
| **Avg Requests/Second** | 65.54 req/s | 191.15 req/s |
| **Avg Bytes/Second**    | 20.6 kB     | 44.2 kB      |
| **Total Requests**      | 4,000       | 11,000       |
| **Total Data Read**     | 1.24 MB     | 2.65 MB      |

#### **Analysis**

- **Latency:**
    The `NestJS` service exhibits higher latency (average of 153.03 ms) compared to `ExpressJS` (51.72 ms). The additional validations and securities in `NestJS` are contributing to the increased processing time.
    
- **Throughput:**
    `ExpressJS` handles almost 3 times the number of req/s compared to `NestJS`. This shows a significant performance overhead introduced by the additional features in `NestJS`.
    
- **Data Throughput:**  
    `ExpressJS` transfers more data per second, due to its higher request throughput.
    

---

### **GET** Test Results

| Metric                     | NestJS         | ExpressJS    |
| -------------------------- | -------------- | ------------ |
| **Avg Latency**            | 3.93 ms        | 11.59 ms     |
| **Avg Requests/Second**    | 2,241.35 req/s | 827.54 req/s |
| **Avg Bytes/Second**       | 771 kB         | 273 kB       |
| **Total Requests**         | 134,000        | 50,000       |
| **Non Successful Request** | 14,460         | 13,390       |
| **Total Data Read**        | 46.3 MB        | 16.4 MB      |

#### **Analysis**

- **Latency:**  
    `NestJS` performs better in **GET** requests, with an average latency of 3.93 ms compared to `ExpressJS`’s 11.59 ms. This suggests that `NestJS`'s optimizations like cache-aside has great impact on **GET** requests latency.
    
- **Throughput:**  
    `NestJS` processes more than double the requests per second compared to `ExpressJS`, demonstrating its ability to efficiently handle high loads for read operations.
    
- **Data Throughput:**  
    `NestJS` handles approximately three times the data transfer compared to `ExpressJS`, correlating with its higher request throughput.
    

---

### **Error Analysis**

| Metric                | NestJS  | ExpressJS |
| --------------------- | ------- | --------- |
| **2xx Responses**     | 124,000 | 47,262    |
| **Non-2xx Responses** | 14,460  | 13,390    |

#### **Observations**

- Both services reported a notable number of non-2xx responses, which could be caused by rate limiting, validation failures, or server-side issues.
- `NestJS` has a slightly higher proportion of errors during **GET** tests, potentially due to the rate limiting.

---

### **Summary**

| Metric               | Winner    | Key Insights                                          |
| -------------------- | --------- | ----------------------------------------------------- |
| **POST Avg Latency** | ExpressJS | Faster due to lack of additional processing overhead. |
| **POST Throughput**  | ExpressJS | Handles more requests per second.                     |
| **GET Avg Latency**  | NestJS    | Faster due to has more optimizations.                 |
| **GET Throughput**   | NestJS    | Scales better for high-read workloads.                |

---

### **Conclusions and Recommendations**

1. **NestJS Performance:**
    - **Strengths:** Handles **GET** requests efficiently, even under high load.
    - **Weaknesses:** High latency and lower throughput for **POST** requests, due to security, and validation.
2. **ExpressJS Performance:**
    - **Strengths:** Outperforms in **POST** requests due to minimal processing.
    - **Weaknesses:** Less efficient in **GET** requests compared to `NestJS`.
4. **Optimizations for NestJS:**
    - Consider tuning or bypassing security and validation for certain **POST** operations to reduce latency.
5. **Next Steps:**
    - Analyze resource usage (CPU, memory) for both services during the tests to identify any bottlenecks.