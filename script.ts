interface Glob {
    toString(): string;
}

class Raw implements Glob {
    constructor(private value: string) {}

    public toString(): string {
        return this.value
    }
}

class Concat implements Glob {
    private globs: Glob[]
    constructor(...identifier: Glob[]) {
        this.globs = identifier;
    }

    public toString(): string {
        return this.globs.map(glob => glob.toString()).join("")
    }
}

abstract class ExtGlob implements Glob {
    abstract modifier: String;
    
    private globs: Glob[]
    constructor(...globs: Glob[]) {
        this.globs = globs;
    }

    public toString(): string {
        const joinedGlobs = this.globs.map(glob => glob.toString()).join("|");

        return `${this.modifier}(${joinedGlobs})` 
    }
}

class Or extends ExtGlob {
    modifier: String = '@';
}
class OneOrMore extends ExtGlob {
    modifier: String = '+';
}
class ZeroOrMore extends ExtGlob {
    modifier: String = '*';
}
class ZeroOrOne extends ExtGlob {
    modifier: String = '?';
}

const dot = new Raw(".")
const dash = new Raw("-")
const plus = new Raw("+")
const letter = new Raw("[a-zA-Z]");
const positiveDigit = new Raw("[1-9]");
const digit = new Raw("[0-9]");
const nonDigit = new Or(dash, letter);
const identifierCharacter = new Raw("[a-zA-Z0-9-]");
const numericIdentifier = new Or(new Raw("0"), new Concat(positiveDigit, new ZeroOrMore(digit)))
const alphanumericIdentifier = new Concat(new ZeroOrMore(identifierCharacter), nonDigit, new ZeroOrMore(identifierCharacter))
const buildIdentifier = new Or(alphanumericIdentifier, new OneOrMore(digit));
const prereleaseIdentifier = new Or(alphanumericIdentifier, numericIdentifier)
const dotSeparatedBuildIdentifier = new Concat(buildIdentifier, new ZeroOrMore(new Concat(dot, buildIdentifier)));
const build = dotSeparatedBuildIdentifier;
const dotSeparatedPreReleaseIdentifier = new Concat(prereleaseIdentifier, new ZeroOrMore(new Concat(dot, prereleaseIdentifier)));
const preRelease = dotSeparatedPreReleaseIdentifier;
const patch = numericIdentifier;
const minor = numericIdentifier;
const major = numericIdentifier;
const versionCore = new Concat(major, dot, minor, dot, patch);
const validSemVer = new Concat(versionCore, new ZeroOrOne(new Concat(dash, preRelease)), new ZeroOrOne(new Concat(plus, build)));

console.log(validSemVer.toString())

console.log(validSemVer.toString().length)
