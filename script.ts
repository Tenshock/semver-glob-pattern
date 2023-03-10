interface Glob {
    get(): string;
}

class Raw implements Glob {
    constructor(private value: string) {}

    public get(): string {
        return this.value
    }
}

class Concat implements Glob {
    private globs: Glob[]
    constructor(...identifier: Glob[]) {
        this.globs = identifier;
    }

    public get(): string {
        return this.globs.map(glob => glob.get()).join("")
    }
}

abstract class ExtGlob implements Glob {
    protected abstract modifier: String;
    
    private globs: Glob[]
    constructor(...globs: Glob[]) {
        this.globs = globs;
    }

    public get(): string {
        const joinedGlobs = this.globs.map(glob => glob.get()).join("|");

        return `${this.modifier}(${joinedGlobs})` 
    }
}

class Or extends ExtGlob {
    protected modifier: String = '@';
}
class OneOrMore extends ExtGlob {
    protected modifier: String = '+';
}
class ZeroOrMore extends ExtGlob {
    protected modifier: String = '*';
}
class ZeroOrOne extends ExtGlob {
    protected modifier: String = '?';
}

const dot = new Raw(".")
const dash = new Raw("-")
const plus = new Raw("+")
const letter = new Raw("[a-zA-Z]");
const positiveDigit = new Raw("[1-9]");
const digit = new Raw("[0-9]");
const zero = new Raw("0")
const nonDigit = new Raw("[a-zA-Z-]");
const identifierCharacter = new Raw("[a-zA-Z0-9-]");
const numericIdentifier = new Or(zero, new Concat(positiveDigit, new ZeroOrMore(digit)))
const alphanumericIdentifier = new Concat(new ZeroOrMore(digit), nonDigit, new ZeroOrMore(identifierCharacter))
const prereleaseIdentifier = new Or(alphanumericIdentifier, numericIdentifier)
const dotSeparatedBuildIdentifier = new Concat(new OneOrMore(identifierCharacter), new ZeroOrMore(new Concat(dot, new OneOrMore(identifierCharacter))));
const build = dotSeparatedBuildIdentifier;
const dotSeparatedPreReleaseIdentifier = new Concat(prereleaseIdentifier, new ZeroOrMore(new Concat(dot, prereleaseIdentifier)));
const preRelease = dotSeparatedPreReleaseIdentifier;
const patch = numericIdentifier;
const minor = numericIdentifier;
const major = numericIdentifier;
const versionCore = new Concat(major, dot, minor, dot, patch);
const validSemVer = new Concat(versionCore, new ZeroOrOne(new Concat(dash, preRelease)), new ZeroOrOne(new Concat(plus, build)));

console.log("validSemVer:\n", validSemVer.get())
console.log("length: ", validSemVer.get().length)
