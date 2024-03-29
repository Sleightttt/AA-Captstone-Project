from flask import Blueprint, jsonify, session, request
from app.models import  db, Image, User
from app.forms.image_form import ImageForm
from app.forms.image_update_form import ImageForm2
from flask_login import current_user
from datetime import datetime
from app.routes.aws_helpers import upload_file_to_s3, get_unique_filename




image_routes = Blueprint('images', __name__)

# Get all images /api/image/
@image_routes.route('/')
def get_images():
    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

# Create a image /api/image/
@image_routes.route('/', methods=['POST'])
def create_product():

    form = ImageForm()
    if current_user.is_authenticated:

        user = current_user.to_dict()
        owner_id = user['id']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            izg = form.data['url']

            izg.filename = get_unique_filename(izg.filename)


            upload = upload_file_to_s3(izg)



            image = Image(
                name=form.data['name'],
                description=form.data['description'],
                url=upload['url'],
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

# # Update a image /api/image/:id
@image_routes.route('/<int:id>', methods=['PUT'])
def update_image(id):
    form = ImageForm2()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        owner_id = user['id']
        image = Image.query.get(id)
        form['csrf_token'].data = request.cookies['csrf_token']
        print('This is form dataaaaaaaaaaa',form.data['name'], form.data['description'], form.data)
        if form.validate_on_submit():

            image.name = form.data['name']
            image.description = form.data['description']
            image.updated_at = datetime.utcnow()
            db.session.add(image)
            db.session.commit()
            return image.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

# Get a single image /api/image/:id
@image_routes.route('/<int:id>')
def get_product(id):
    image = Image.query.get(id)
    owner = User.query.get(image.owner_id)
    image = image.to_dict()
    image['owner'] = owner.to_dict()
    return image

# # Delete a image /api/image/:id
@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):

    if current_user.is_authenticated:
        image = Image.query.get(id)
        db.session.delete(image)
        db.session.commit()
        return {'message': 'Image deleted'}
    return {'errors': 'Unauthorized'}, 403


# Get images by owner
@image_routes.route('/owner/<int:id>')
def get_images_by_owner(id):
    images = Image.query.filter_by(owner_id=id).all()
    return {'images': [image.to_dict() for image in images], 'owner': User.query.get(id).to_dict()}
