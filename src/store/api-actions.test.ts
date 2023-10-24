import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store/';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeProduct, makeFakePromoProduct, makeFakeReview } from '../utils/mocks';
import { State } from '../types/state';
import { Product } from '../types/product';
import { fetchProductDataAction, fetchProductReviewsAction, fetchProductsAction, fetchPromoProductsAction, fetchSimilarProductsAction, postNewCommentAction } from './api-action';
import { APIRoute } from '../config';
import { createNewComment, loadProductData, loadProductReview, loadProducts, loadPromoProducts, loadSimilarProducts, setNewCommentPending, setProductsLoading } from './action';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      products: [],
      promoProducts: [],
      isProductsLoading: true,
      productData: {} as Product,
      similarProducts: [],
      productReviews: [],
      newCommentPending: false,
    });
  });

  describe('fetchProductsAction', () => {
    const mockProducts = [makeFakeProduct(), makeFakeProduct()];

    it('should dispatch "fetchProductsAction.pending" and "fetchProductsAction.fulfilled" with thunk "fetchProductsAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());
      const extractedActionsType = extractActionsTypes(store.getActions());
      const fetchProductsActionFulfilled = store.getActions().at(2) as ReturnType<typeof fetchProductsAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchProductsAction.pending.type,
        setProductsLoading.type,
        loadProducts.type,
        setProductsLoading.type,
        fetchProductsAction.fulfilled.type,
      ]);
      expect(fetchProductsActionFulfilled.payload).toEqual(mockProducts);
    });


    it('should dispatch "fetchProductsAction.pending" and "fetchProductsAction.rejected" with thunk "fetchProductsAction" with server response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(404);

      await store.dispatch(fetchProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        setProductsLoading.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });


  describe('fetchPromoProductsAction', () => {
    const mockPromoProducts = [makeFakePromoProduct(), makeFakePromoProduct()];

    it('should dispatch "fetchPromoProductsAction.pending" and "fetchPromoProductsAction.fulfilled" with thunk "fetchPromoProductsAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoProducts);

      await store.dispatch(fetchPromoProductsAction());
      const extractedActionsType = extractActionsTypes(store.getActions());
      const fetchPromoProductsActionFulfilled = store.getActions().at(2) as ReturnType<typeof fetchPromoProductsAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchPromoProductsAction.pending.type,
        setProductsLoading.type,
        loadPromoProducts.type,
        setProductsLoading.type,
        fetchPromoProductsAction.fulfilled.type,
      ]);
      expect(fetchPromoProductsActionFulfilled.payload).toEqual(mockPromoProducts);
    });


    it('should dispatch "fetchPromoProductsAction.pending" and "fetchPromoProductsAction.rejected" with thunk "fetchPromoProductsAction" with server response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(404);

      await store.dispatch(fetchPromoProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoProductsAction.pending.type,
        setProductsLoading.type,
        fetchPromoProductsAction.rejected.type,
      ]);
    });
  });


  describe('fetchProductDataAction', () => {
    const mockProduct = makeFakePromoProduct();
    const mockProductId = mockProduct.id;

    it('should dispatch "fetchProductDataAction.pending" and "fetchProductDataAction.fulfilled" with thunk "fetchProductDataAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductId}`).reply(200, mockProduct);

      await store.dispatch(fetchProductDataAction(String(mockProductId)));
      const extractedActionsType = extractActionsTypes(store.getActions());
      const fetchProductActionFulfilled = store.getActions().at(2) as ReturnType<typeof fetchProductDataAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchProductDataAction.pending.type,
        setProductsLoading.type,
        loadProductData.type,
        setProductsLoading.type,
        fetchProductDataAction.fulfilled.type,
      ]);
      expect(fetchProductActionFulfilled.payload).toEqual(mockProduct);
    });


    it('should dispatch "fetchProductDataAction.pending" and "fetchProductDataAction.rejected" with thunk "fetchProductDataAction" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductId}`).reply(404);

      await store.dispatch(fetchProductDataAction(String(mockProductId)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductDataAction.pending.type,
        setProductsLoading.type,
        fetchProductDataAction.rejected.type,
      ]);
    });
  });


  describe('fetchSimilarProductsAction', () => {
    const mockProduct = makeFakePromoProduct();
    const mockProductId = mockProduct.id;
    const mockSimilarProducts = [makeFakePromoProduct(), makeFakePromoProduct()];

    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.fulfilled" with thunk "fetchSimilarProductsAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductId}${APIRoute.Similar}`).reply(200, mockSimilarProducts);

      await store.dispatch(fetchSimilarProductsAction(String(mockProductId)));
      const extractedActionsType = extractActionsTypes(store.getActions());
      const fetchSimilarProductsActionFulfilled = store.getActions().at(2) as ReturnType<typeof fetchSimilarProductsAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchSimilarProductsAction.pending.type,
        setProductsLoading.type,
        loadSimilarProducts.type,
        setProductsLoading.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);
      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(mockSimilarProducts);
    });


    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.rejected" with thunk "fetchSimilarProductsAction" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductId}${APIRoute.Similar}`).reply(404);

      await store.dispatch(fetchSimilarProductsAction(String(mockProductId)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProductsAction.pending.type,
        setProductsLoading.type,
        fetchSimilarProductsAction.rejected.type,
      ]);
    });
  });


  describe('fetchProductReviewsAction', () => {
    const mockProduct = makeFakePromoProduct();
    const mockProductId = mockProduct.id;
    const mockReviews = [makeFakeReview(), makeFakeReview()];

    it('should dispatch "fetchProductReviewsAction.pending" and "fetchProductReviewsAction.fulfilled" with thunk "fetchProductReviewsAction"', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${String(mockProductId)}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchProductReviewsAction(String(mockProductId)));
      const extractedActionsType = extractActionsTypes(store.getActions());
      const fetchProductReviewsActionFulfilled = store.getActions().at(2) as ReturnType<typeof fetchProductReviewsAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        fetchProductReviewsAction.pending.type,
        setProductsLoading.type,
        loadProductReview.type,
        setProductsLoading.type,
        fetchProductReviewsAction.fulfilled.type,
      ]);
      expect(fetchProductReviewsActionFulfilled.payload).toEqual(mockReviews);
    });


    it('should dispatch "fetchProductReviewsAction.pending" and "fetchProductReviewsAction.rejected" with thunk "fetchProductReviewsAction" with server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${String(mockProductId)}${APIRoute.Reviews}`).reply(404);

      await store.dispatch(fetchProductReviewsAction(String(mockProductId)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductReviewsAction.pending.type,
        setProductsLoading.type,
        fetchProductReviewsAction.rejected.type,
      ]);
    });
  });


  describe('postNewCommentAction', () => {
    const mockProduct = makeFakePromoProduct();
    const mockProductId = mockProduct.id;
    const mockReview = makeFakeReview();
    const mockComment = makeFakeComment();

    it('should dispatch "postNewCommentAction.pending" and "postNewCommentAction.fulfilled" with thunk "postNewCommentAction"', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, mockReview);

      await store.dispatch(postNewCommentAction(mockComment));
      const extractedActionsType = extractActionsTypes(store.getActions());
      const postNewCommentActionFullfiled = store.getActions().at(2) as ReturnType<typeof postNewCommentAction.fulfilled>;

      expect(extractedActionsType).toEqual([
        postNewCommentAction.pending.type,
        setNewCommentPending.type,
        createNewComment.type,
        setNewCommentPending.type,
        postNewCommentAction.fulfilled.type,
      ]);
      expect(postNewCommentActionFullfiled.payload).toEqual(mockReview);
    });


    it('should dispatch "postNewCommentAction.pending" and "postNewCommentAction.rejected" with thunk "postNewCommentAction" with server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(400);

      await store.dispatch(postNewCommentAction(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postNewCommentAction.pending.type,
        setNewCommentPending.type,
        postNewCommentAction.rejected.type,
      ]);
    });
  });

});
