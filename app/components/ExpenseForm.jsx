"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
/*
W props
initialValues: początkowe wartości pól formularza.
categories: lista kategorii do wyboru
onSubmit: funkcja wywoływana po zatwierdzeniu formularza.
onCancel: funkcja wywoływana po anluacji.
*/
export default function ExpenseForm({ 
  initialValues, 
  categories, 
  onSubmit, 
  onCancel 
}) { 
  // Reguły walidacji fromularza 
  const validationSchema = Yup.object({
    title: Yup.string() //minimum 3 znaki, wymagane
      .min(3, "Minimum 3 znaki") 
      .required("Wymagane"),
    amount: Yup.number() //musi być liczbą dodatnią, wymagana
      .positive("Musi być dodatnia")
      .required("Wymagane"),
    category: Yup.string()
      .required("Wybierz kategorię"),//wymagane
    date: Yup.date()
      .required("Wymagane"),//wymagane
    description: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}  //ustawia wartości startowe
      validationSchema={validationSchema} //ustawia wartości startowe stworzoną wyżej
      onSubmit={(values, actions) => {  //wywołane po zatwierdzeniu 
        onSubmit(values); //wywołuje funkcję on submit przekazując values
        actions.resetForm(); //Resetuje formularz 
      }}
    >
      {({ isSubmitting }) => ( //tutaj formik przekazuje dane do formularza 
        <Form>
          <div>
            <label>Tytuł:</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" className="error" /> 
            {/* komunikat błedów formularza */}
          </div>

          <div>
            <label>Kwota:</label>
            <Field name="amount" type="number" step="0.01" />
            <ErrorMessage name="amount" component="div" className="error" />
          </div>

          <div>
            <label>Kategoria:</label>
            <Field as="select" name="category">
              <option value="">– wybierz –</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="error" />
          </div>

          <div>
            <label>Data:</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>

          <div>
            <label>Opis:</label>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Zapisz
          </button>
          <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
            Anuluj
          </button>
        </Form>
      )}
    </Formik>
  );
}
