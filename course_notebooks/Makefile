.PHONY: all clean

all: rv.csv rv_metadata.csv rv_strata.csv

clean:
	rm rv_book_*.csv metadata_book_*.csv strata_book_*.csv

rv.csv: rv_book_01.csv rv_book_02.csv rv_book_03.csv rv_book_04.csv rv_book_05.csv rv_book_06.csv rv_book_07.csv rv_book_08.csv rv_book_09.csv rv_book_10.csv
	xsv cat rows $^ --output $@

rv_metadata.csv: metadata_book_01.csv metadata_book_02.csv metadata_book_03.csv metadata_book_04.csv metadata_book_05.csv metadata_book_06.csv metadata_book_07.csv metadata_book_08.csv metadata_book_09.csv metadata_book_10.csv
	xsv cat rows $^ --output $@

rv_strata.csv: strata_book_01.csv strata_book_02.csv strata_book_03.csv strata_book_04.csv strata_book_05.csv strata_book_06.csv strata_book_07.csv strata_book_08.csv strata_book_09.csv strata_book_10.csv
	xsv cat rows $^ --output $@

metadata_book_%.csv: vedaweb-data/rigveda/TEI/rv_book_%.tei
	saxonb -s:$< -xsl:tei2metadata.xslt -o:$@

strata_book_%.csv: vedaweb-data/rigveda/TEI/rv_book_%.tei
	saxonb -s:$< -xsl:tei2strata.xslt -o:$@

rv_book_%.csv: vedaweb-data/rigveda/TEI/rv_book_%.tei
	saxonb -s:$< -xsl:tei2csv.xslt -o:$@

