from flask.cli import AppGroup
from .users import seed_users, undo_users
from .orders import seed_orders, undo_orders
from .transactions import seed_transactions, undo_transactions
from .paymentmethods import seed_paymentmethods, undo_paymentmethods
from .translations import seed_translations, undo_translations
from .proofreadings import seed_proofreadings, undo_proofreadings
from .copywritings import seed_copywritings, undo_copywritings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_paymentmethods()
    seed_transactions()
    seed_orders()
    seed_translations()
    seed_proofreadings()
    seed_copywritings()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_paymentmethods()
    undo_transactions()
    undo_orders()
    undo_translations()
    undo_proofreadings()
    undo_copywritings()
    # Add other undo functions here
