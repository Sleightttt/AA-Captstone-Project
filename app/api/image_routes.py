from flask import Blueprint, jsonify, session, request
from app.models import  db, Image, User
from app.forms.image_form import ImageForm
from flask_login import current_user
from datetime import datetime




image_routes = Blueprint('images', __name__)

# Get all products /api/product/
@image_routes.route('/')
def get_images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

# Create a product /api/product/
@image_routes.route('/', methods=['POST'])
def create_product():

    form = ImageForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        owner_id = user['id']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            image = Image(
                name=form.data['name'],
                description=form.data['description'],
                url=form.data['url'],
                lat=form.data['lat'],
                lng=form.data['lng'],
                owner_id=owner_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.session.add(image)
            db.session.commit()
            return image.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

# # Update a product /api/product/:id
@image_routes.route('/<int:id>', methods=['PUT'])
def update_image(id):
    form = ImageForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        owner_id = user['id']
        image = Image.query.get(id)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            image.name = form.data['name']
            image.description = form.data['description']
            image.lat = form.data['lat']
            image.lng = form.data['lng']
            image.url = form.data['url']
            image.owner_id = owner_id
            image.updated_at = datetime.utcnow()
            db.session.add(image)
            db.session.commit()
            return image.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

# Get a single product /api/product/:id
@image_routes.route('/<int:id>')
def get_product(id):
    image = Image.query.get(id)
    owner = User.query.get(image.owner_id)
    image = image.to_dict()
    image['owner'] = owner.to_dict()
    return image

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
