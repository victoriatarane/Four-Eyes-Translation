from app.models import db, Copywriting
# from app.models.order import LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_copywritings():
    copywriting = Copywriting(
        order_id=4, description='Blog post about vegan cousine. Describe how different traditional recipies can be slightly adjusted to vegan diet.', key_words='vegan, plant based, trendy, sustainable, delicious, unbelievable, healthy, superfoods, chia seeds, environment, ethical', links='google.com', field='Math', word_count=155, language='English', created_at='2021-08-22')

    db.session.add(copywriting)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_copywritings():
    db.session.execute('TRUNCATE copywritings RESTART IDENTITY CASCADE;')
    db.session.commit()
