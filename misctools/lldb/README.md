# LLDB Pretty Printers for Bun

Pretty printers for Bun data structures (strings, types, WebKit objects).

## Files

- `bun_pretty_printer.py` - Bun-specific types (bun.String, ZigString, WTFStringImpl)
- `lldb_pretty_printers.py` - Zig language types
- `lldb_webkit.py` - WebKit/JavaScriptCore types
- `init.lldb` - LLDB initialization script

## Supported Types

**bun.String variants:**
- `bun.String` (tagged union)
- `WTFStringImpl` (Latin1/UTF16)
- `ZigString` (UTF8/Latin1/UTF16 with pointer tagging)
- `StaticZigString` (static/immortal)
- Empty string

**Display examples:**
```
"Hello, World!" [latin1]
"UTF-8 String 🎉" [utf8]
"Static content" [latin1 static]
<dead>
```

## Setup

**Automatic (recommended):** Add to `~/.lldbinit`
```lldb
command script import /path/to/bun/misctools/lldb/bun_pretty_printer.py
```

**Per-session:**
```lldb
(lldb) command script import misctools/lldb/bun_pretty_printer.py
```

## Quick Start

```bash
bun bd                                    # Build debug binary
lldb ./build/debug/bun-debug              # Start LLDB
```

```lldb
(lldb) command script import misctools/lldb/bun_pretty_printer.py
(lldb) frame variable                     # View with pretty printers
```

## Implementation

### ZigString (Pointer Tagging)
- Bit 63: UTF16 flag
- Bit 62: Globally allocated
- Bit 61: UTF8 encoding

### WTFStringImpl
- Flag bit 2 in `m_hashAndFlags`: Latin1 (1) vs UTF16 (0)

### bun.String Tags
- 0 = Dead | 1 = WTFStringImpl | 2 = ZigString | 3 = StaticZigString | 4 = Empty

## Troubleshooting

**Verify setup:**
```lldb
(lldb) script print("Python works")      # Check Python
(lldb) type category list                # List enabled categories
(lldb) type category enable bun          # Enable manually
```
