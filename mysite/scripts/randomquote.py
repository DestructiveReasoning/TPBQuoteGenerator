from random import randint

random_quotes = [
        "Hello, Newman",
        "Hello, Jerry",
        "Yo Yo Ma!",
        "You useless pustule!",
        "NO SOUP FOR YOU!",
        "These pretzels are making me thirsty"
        ];

def get_random_quote():
    print("RANDOM'D")
    return random_quotes[randint(0,len(random_quotes) - 1)]

