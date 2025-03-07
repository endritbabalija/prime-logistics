- [x] **Section Setup:**  
  - Create a dedicated section on the landing page titled "Shipping Cost Calculator".

- [x] **Input Fields:**  
  - Add fields for:
    - Package Weight (user enters actual weight).
    - Package Dimensions (Length, Width, and Height).
    - Destination Type (dropdown/radio options: e.g., within Kosovo, neighboring regions, international).

- [x] **Service Option Toggle:**  
  - Implement a selection control for "Transport të plotë" (full transport) vs. "Transport parcial" (partial transport).
  - Ensure this choice adjusts the calculation parameters accordingly.

- [x] **Dimensional Weight Calculation:**  
  - Calculate dimensional weight using the formula:  
    \[
    \text{Dimensional Weight} = \frac{\text{Length} \times \text{Width} \times \text{Height}}{\text{DIM Divisor}}
    \]
  - Use the appropriate DIM divisor based on local standards (e.g., 5000 for metric).

- [x] **Determine Billable Weight:**  
  - Compare actual weight and dimensional weight; use the higher value as the billable weight.

- [x] **Cost Estimation Formula:**  
  - Apply a base fee plus a per-unit weight rate to the billable weight.
  - Adjust the rate/fee based on whether "full" or "partial" transport is selected.

- [x] **Result Display:**  
  - Present the calculated shipping cost in a real-time updated output area.

- [x] **User Guidance:**  
  - Add brief instructions or tooltips explaining each field and the service options.

- [x] **Testing & Validation:**  
  - Validate all input values.
  - Ensure the calculator recalculates the estimate immediately upon any change.
