import React from 'react';
import { useForm } from 'react-hook-form';
import { database } from '../firebase/index';
import classes from '../css/addProduct.module.css';

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className={classes.addForm}
      onSubmit={handleSubmit((data, e) => {
        return database
          .ref('products/' + data.title)
          .set({
            title: data.title,
            price: data.price,
            imageUrl: data.imageUrl,
            description: data.description,
          })
          .then(() => {
            e.target.reset();
            e.window.redirect('/');
          });
      })}>
      <label className={classes.titleLabel} htmlFor="title">
        Title
      </label>
      <input
        id="title"
        {...register('title', { required: 'this is required', maxLength: 20 })}
      />
      {errors.title && <p>{errors.title.message}</p>}
      <label className={classes.priceLabel} htmlFor="price">
        Price
      </label>
      <input
        id="price"
        type="number"
        {...register('price', {
          required: 'this is required',
          maxLength: {
            value: 6,
            message: 'you price exceeded max number of 6',
          },
        })}
      />
      {errors.price && <p>{errors.price.message}</p>}
      <label className={classes.imageLabel} htmlFor="imageUrl">
        Image Url
      </label>
      <input
        id="imageUrl"
        type="url"
        {...register('imageUrl', {
          required: 'this is required',
        })}
      />
      {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
      <label className={classes.descLabel} htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        {...register('description', {
          required: 'this is required',
          maxLength: { value: 500, message: 'max amount of characters is 500' },
          minLength: { value: 5, message: 'min amount of characters is 5' },
        })}
      />
      {errors.description && <p>{errors.description.message}</p>}
      <button className={classes.btn} type="submit">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
