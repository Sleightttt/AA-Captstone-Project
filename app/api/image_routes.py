from flask import Blueprint, jsonify, session, request
from app.models import Product, db, Image, User
from app.forms import ProductForm, ImageForm
from flask_login import current_user
from datetime import datetime


product_routes = Blueprint('images', __name__)

# Get all products /api/product/
@product_routes.route('/')
def get_images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

# Create a product /api/product/
# @product_routes.route('/', methods=['POST'])
# def create_product():

#     form = ProductForm()
#     if current_user.is_authenticated:
#         user = current_user.to_dict()
#         seller_id = user['id']
#         form['csrf_token'].data = request.cookies['csrf_token']
#         if form.validate_on_submit():
#             product = Product(
#                 name=form.data['name'],
#                 description=form.data['description'],
#                 price=form.data['price'],
#                 quantity=form.data['quantity'],
#                 seller_id=seller_id,
#                 created_at=datetime.utcnow(),
#                 updated_at=datetime.utcnow(),
#             )
#             db.session.add(product)
#             db.session.commit()
#             return product.to_dict()
#         return {'errors': form.errors}, 401
#     return {'errors': 'Unauthorized'}, 403

# # Update a product /api/product/:id
# @product_routes.route('/<int:id>', methods=['PUT'])
# def update_product(id):
#     form = ProductForm()
#     if current_user.is_authenticated:
#         user = current_user.to_dict()
#         seller_id = user['id']
#         product = Product.query.get(id)
#         form['csrf_token'].data = request.cookies['csrf_token']
#         if form.validate_on_submit():
#             product.name = form.data['name']
#             product.description = form.data['description']
#             product.price = form.data['price']
#             product.quantity = form.data['quantity']
#             product.seller_id = seller_id
#             product.updated_at = datetime.utcnow()
#             db.session.add(product)
#             db.session.commit()
#             return product.to_dict()
#         return {'errors': form.errors}, 401
#     return {'errors': 'Unauthorized'}, 403

# # Get a single product /api/product/:id
# @product_routes.route('/<int:id>')
# def get_product(id):
#     product = Product.query.get(id)
#     seller = User.query.get(product.seller_id)
#     product = product.to_dict()
#     product['seller'] = seller.to_dict()
#     return product

# # Delete a product /api/product/:id
# @product_routes.route('/<int:id>', methods=['DELETE'])
# def delete_product(id):

#     if current_user.is_authenticated:
#         product = Product.query.get(id)
#         db.session.delete(product)
#         db.session.commit()
#         return {'message': 'Product deleted'}
#     return {'errors': 'Unauthorized'}, 403


# # create a product image /api/product/:id/image
# @product_routes.route('/<int:id>/image', methods=['POST'])
# def create_product_image(id):
#     form = ImageForm()
#     if current_user.is_authenticated:
#         user = current_user.to_dict()
#         product = Product.query.get(id)
#         image = Image(
#             url=form.data['url'],
#             preview=form.data['preview'],
#             product_id=product.id
#         )
#         db.session.add(image)
#         db.session.commit()
#         return image.to_dict()
#     return {'errors': 'Unauthorized'}, 403

# # get images by product id /api/product/:id/image
# @product_routes.route('/<int:id>/image')
# def get_product_images(id):
#     product = Product.query.get(id)
#     images = Image.query.filter_by(product_id=product.id).all()
#     return {'images': [image.to_dict() for image in images]}

# # edit product image /api/product/:id/image/:image_id
# @product_routes.route('/<int:id>/image/<int:image_id>', methods=['PUT'])
# def edit_product_image(id, image_id):
#     form = ImageForm()
#     if current_user.is_authenticated:
#         user = current_user.to_dict()
#         image = Image.query.get(image_id)
#         image.url = form.data['url']
#         image.preview = form.data['preview']
#         db.session.add(image)
#         db.session.commit()
#         return image.to_dict()
#     return {'errors': 'Unauthorized'}, 403


# # get all products by seller id /api/product/seller/:id
# @product_routes.route('/seller/<int:id>')
# def get_products_by_seller(id):
#     products = Product.query.filter_by(seller_id=id).all()
#     return {'products': [product.to_dict() for product in products], 'seller': User.query.get(id).to_dict()}
