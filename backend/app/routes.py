from flask import Blueprint, request, jsonify
from . import db
from .models import User, TeeTime, Course
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)
main = Blueprint('main', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 409
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'message': 'Invalid email or password'}), 401
    token = user.generate_token()
    return jsonify({'token': token}), 200

@main.route('/sell', methods=['POST'])
def sell():
    data = request.get_json()
    course_id = data.get('courseId')
    start_time = data.get('startTime')
    end_time = data.get('endTime')
    price = data.get('price')
    new_tee_time = TeeTime(course_id=course_id, start_time=start_time, end_time=end_time, price=price)
    db.session.add(new_tee_time)
    db.session.commit()
    return jsonify({'message': 'Tee time listed for sale'}), 201

@main.route('/marketplace', methods=['GET'])
def marketplace():
    tee_times = TeeTime.query.all()
    result = []
    for tee_time in tee_times:
        result.append({
            'id': tee_time.id,
            'course': tee_time.course.name,
            'start_time': tee_time.start_time,
            'end_time': tee_time.end_time,
            'price': tee_time.price
        })
    return jsonify(result), 200


@main.route('/add_course', methods=['POST'])
def add_course():
    data = request.get_json()
    name = data.get('name')
    location = data.get('location')

    new_course = Course(name=name, location=location)
    db.session.add(new_course)
    db.session.commit()

    return jsonify({'message': 'Course added successfully'}), 201

@main.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    result = [{'id': course.id, 'name': course.name} for course in courses]
    return jsonify(result), 200


@main.route('/my_tee_times', methods=['GET'])
def my_tee_times():
    token = request.headers.get('Authorization').split(" ")[1]
    user_id = User.verify_token(token).id
    tee_times = TeeTime.query.filter_by(user_id=user_id).all()
    result = []
    for tee_time in tee_times:
        result.append({
            'id': tee_time.id,
            'course': tee_time.course.name,
            'start_time': tee_time.start_time,
            'end_time': tee_time.end_time,
            'price': tee_time.price
        })
    return jsonify(result), 200


@main.route('/')
def index():
    return "Welcome to the Golf App!"

def register_routes(app):
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')
